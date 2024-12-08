const axios = require('axios');
const fs = require('fs');

async function getstatus() {
    try {
      const response = await fetch(`https://files.roxcelic.love/status/status.json`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
}
  
async function getimage() {
    try {
      const response = await fetch(`https://files.roxcelic.love/status/image.json`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
}

module.exports = { getstatus, getimage};