// 代码生成时间: 2025-10-04 01:54:22
// 补丁管理工具
// 该工具用于管理软件补丁，包括补丁的添加、删除和更新等功能。

const fs = require('fs');
const path = require('path');

// 补丁存储路径
const patchesPath = path.join(__dirname, 'patches');

// 错误处理函数
function handleError(error) {
  console.error('An error occurred:', error.message);
}

// 添加补丁
function addPatch(patchId, patchContent) {
  try {
    // 确保补丁存储目录存在
    fs.mkdirSync(patchesPath, { recursive: true });

    // 写入补丁文件
    const patchFilePath = path.join(patchesPath, `${patchId}.patch`);
    fs.writeFileSync(patchFilePath, patchContent);
    console.log(`Patch ${patchId} added successfully`);
  } catch (error) {
    handleError(error);
  }
}

// 删除补丁
function removePatch(patchId) {
  try {
    const patchFilePath = path.join(patchesPath, `${patchId}.patch`);
    if (fs.existsSync(patchFilePath)) {
      fs.unlinkSync(patchFilePath);
      console.log(`Patch ${patchId} removed successfully`);
    } else {
      console.log(`Patch ${patchId} does not exist`);
    }
  } catch (error) {
    handleError(error);
  }
}

// 更新补丁
function updatePatch(patchId, newPatchContent) {
  try {
    const patchFilePath = path.join(patchesPath, `${patchId}.patch`);
    if (fs.existsSync(patchFilePath)) {
      fs.writeFileSync(patchFilePath, newPatchContent);
      console.log(`Patch ${patchId} updated successfully`);
    } else {
      console.log(`Patch ${patchId} does not exist`);
    }
  } catch (error) {
    handleError(error);
  }
}

// 获取所有补丁列表
function getAllPatches() {
  try {
    const patchFiles = fs.readdirSync(patchesPath);
    const patchList = patchFiles.map(file => path.parse(file).name);
    console.log('Patches list:', patchList);
    return patchList;
  } catch (error) {
    handleError(error);
  }
}

// 导出函数
module.exports = {
  addPatch,
  removePatch,
  updatePatch,
  getAllPatches
};
