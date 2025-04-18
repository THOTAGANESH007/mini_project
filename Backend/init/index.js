import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

// 10 sample MongoDB ObjectIds
const userIds = [
  "661f9f72e13fdd57b7095a10",
  "661f9f72e13fdd57b7095a10",
  "661f9f72e13fdd57b7095a10",
  "661f9f72e13fdd57b7095a10",
  "661f9f72e13fdd57b7095a12",
  "661f9f72e13fdd57b7095a12",
  "661f9f72e13fdd57b7095a12",
  "661f9f72e13fdd57b7095a11",
  "661f9f72e13fdd57b7095a11",
  "661f9f72e13fdd57b7095a11",
];

const imagePath = '/home/shaik/Downloads/leakage.webp';

const categories = ['Electrical', 'Sanitation', 'Water_Service'];
const statuses = ['Pending', 'Rejected', 'Accepted', 'Processing', 'Resolved'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function createComplaint(userId, index) {
  const formData = new FormData();

  formData.append('userId', userId);
  formData.append('category', getRandom(categories));
  formData.append('status', getRandom(statuses));
  formData.append('email', `user${index}@example.com`);
  formData.append('phone', `99999999${index}`);
  formData.append('description', `Auto-generated complaint ${index + 1}`);

  if (fs.existsSync(imagePath)) {
    formData.append('image', fs.createReadStream(imagePath), {
      filename: 'leakage.webp',
      contentType: 'image/webp',
    });
  } else {
    console.warn('⚠️ Image file not found! Skipping image upload.');
  }

  try {
    const response = await axios.post('http://localhost:9999/api/complaints', formData, {
      headers: formData.getHeaders(),
      withCredentials: true,
    });
    console.log(`✅ Complaint ${index + 1} submitted successfully`);
  } catch (error) {
    console.error(`❌ Complaint ${index + 1} failed:`, error.response?.data || error.message);
  }
}

async function seedComplaints() {
  for (let i = 0; i < userIds.length; i++) {
    await createComplaint(userIds[i], i);
  }
}

seedComplaints();
