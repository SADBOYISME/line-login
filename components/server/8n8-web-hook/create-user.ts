"use server";
import axios from "axios";

export const CreateUser = async (dataObj: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.CREATE_USER_API}`,
      dataObj
    );

    console.log("data: ", data);
    // Check if the value of "success" is true
    if (data.success === true) {
      return {
        status: true,
        message: "ลงทะเบียนสำเร็จ",
      };
    } else {
      return {
        status: false,
        message: "ลงทะเบียนไม่สำเร็จ",
      };
    }
  } catch (e) {
    // console.error("Error: ", e);
    return {
      status: false,
      message: "เกิดข้อผิดพลาดในการลงทะเบียน",
    };
  }
};
