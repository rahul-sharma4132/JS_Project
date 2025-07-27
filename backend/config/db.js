const mongoose = require('mongoose');

// const uri = "mongodb+srv://js_user_01:OPTUZxDX3OpJpTBp@cluster23623.ai2tkuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster23623";
// const uri = "mongodb+srv://js_user_01:OPTsdfsdfZxDX3OpJpTBp@cluster23623.ai2tkuc.mongodb.net"
// const uri = "mongodb+srv://js_user_01:Mbszfb6ngknVdcxV@cluster23623.ai2tkuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster23623";
const uri = "mongodb+srv://Cluster23623:dWdMRnB8R2pp@cluster23623.ai2tkuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster23623";

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', uri.replace(/\/\/[^@]*@/, '//****:****@')); // Log connection string with credentials hidden
    
    const connection = await mongoose.connect(uri);
    
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    console.log(`Database name: ${connection.connection.name}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error codeName:', error.codeName);
    process.exit(1);
  }
};

module.exports = connectDB;