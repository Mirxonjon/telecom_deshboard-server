import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

export const fileUpload = async (file: any | any[]) => {
  const dt = { ...file };
  const data = await axios
    .post('http://192.168.42.176:8000/uploadfile/img', dt, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      throw new HttpException('file failed to load', HttpStatus.BAD_REQUEST);
    });
  return data;
};


