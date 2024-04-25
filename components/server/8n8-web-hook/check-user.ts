"use server";

import axios from "axios";

const CheckUser = async (lineUserId: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.CHECK_EXIST_USER_API}?lid=${lineUserId}`
    );

    console.log("data: ", data);
    // Check if the value of "success" is true
    if (data.success === true) {
      return {
        status: true,
        code: 1,
        message: "ท่านลงทะเบียนเข้าร่วมกิจกรรมแล้ว",
      };
    } else {
      return {
        status: false,
        code: 0,
        message: "ท่านยังไม่ได้ลงทะเบียนเข้าร่วมกิจกรรม",
      };
    }
  } catch (e) {
    // console.error("Error: ", e);
    return {
      status: false,
      code: 1,
      message: "เกิดข้อผิดพลาดในการตรวจสอบข้อมูล",
    };
  }
};

export default CheckUser;
