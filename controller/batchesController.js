const XLSX = require("xlsx");
const csv = require("csvtojson");
let passgenerator = require("generate-password");
const BatchSchema = require("../Model/batch/Batch");
const StudentSchema = require("../Model/auth/Students");

let pass = passgenerator.generate({
  length: 8,
  numbers: true,
});
exports.registerbatchController = async (req, res, next) => {
  try {
    let data = req.body;
    let files = req.files;
    // console.log(data, files);
    var workbook = await csv().fromFile(files[0].path);
    // console.log(workbook);

    // var sheet_name_list = workbook.SheetNames;
    // console.log(sheet_name_list);

    // let addstudents = XLSX.utils.sheet_to_json(
    //   workbook.Sheets[sheet_name_list[0]]
    // );
    // console.log(jsonData);
    // if (addstudents.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "xml sheet has no data",
    //   });
    // }

    let addstudents = workbook;
    let finaldata = { ...data, addstudents };
    console.log(finaldata);
    let savedData = await BatchSchema.create(finaldata);
    let batchId = savedData._id;
    let studentsobj = addstudents.map(x => {
      return {
        username: x.username,
        email: x.email,
        phone_number: x.phonenumber,
        password: pass,
        batchCode: batchId,
      };
    });
    let savedStudentsData = await StudentSchema.create(...studentsobj);

    res.status(201).json({
      success: true,
      message: savedStudentsData + savedData + "data added to the database",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
  next();
};

exports.batchList = async (req, res, next) => {
  try {
    let fetchBatchList = await BatchSchema.find({});
    res
      .status(200)
      .json({ success: true, message: "data fetched", fetchBatchList });
  } catch (error) {
    res.status(500).json({ success: false, message: "data not fetch" });
  }
  next();
};

exports.indiualBatchList = async (req, res, next) => {
  try {
    let fetchBatchList = await BatchSchema.find({
      batchcode: req.params.batchcode,
    });
    res
      .status(200)
      .json({ success: true, message: "data fetched", fetchBatchList });
  } catch (error) {
    res.status(500).json({ success: false, message: "data not fetch" });
  }
  next();
};
