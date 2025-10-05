// 代码生成时间: 2025-10-06 03:38:20
const express = require('express');
const { MongoClient } = require('mongodb');
const { NextApiRequest, NextApiResponse } = require('next');

// 创建一个 Express 应用
const app = express();

// MongoDB 数据库配置
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// API 路由用于获取供应链溯源信息
app.get('/api/supply-chain-traceability', async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // 连接到 MongoDB 数据库
        await client.connect();
        const database = client.db('supplyChainDatabase');
        const collection = database.collection('traceability');
        
        // 根据请求参数查询溯源信息
        const { productId } = req.query;
        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        
        // 查询数据库并返回结果
        const traceabilityInfo = await collection.findOne({ productId: productId });
        if (!traceabilityInfo) {
            return res.status(404).json({ error: 'No traceability information found' });
        }
        
        // 返回供应链溯源信息
        res.status(200).json(traceabilityInfo);
    } catch (error) {
        // 错误处理
        console.error('Error fetching traceability information:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        // 断开数据库连接
        await client.close();
    }
});

// 导出 Express 应用以供 Next.js 服务器使用
module.exports = app;

// 请注意，此代码示例不包含完整的 Next.js 页面代码，仅用于展示如何在 Next.js API 路由中实现供应链溯源功能。