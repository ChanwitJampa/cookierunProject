import crypto from 'crypto';
// ฟังก์ชันสร้างแฮชด้วย SHA-256
const generateHash = (data) => {
    return crypto.createHash('sha256')
        .update(data)
        .digest('hex');
}

const compareHash = (hash, data) => {
    const newdata = generateHash(data)
    if (newdata == hash) {
        return true;
    }
    else {
        return false;
    }
}

export default {
    generateHash,
    compareHash
}