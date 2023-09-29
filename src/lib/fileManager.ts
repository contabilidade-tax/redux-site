// utils/fileManager.ts

import fs from 'fs';
import path from 'path';

export const readJSONFile = (filePath: string): any => {
    try {
        const data = fs.readFileSync(path.resolve(filePath), 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
};

export const writeJSONFile = (filePath: string, data: any): void => {
    console.log(data)
    fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2), 'utf-8');
};