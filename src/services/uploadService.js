import axios from 'axios';
import api from './api';

import { Platform } from 'react-native';

/**
 * Uploads a file (like an image) to the backend.
 * @param {string} uri - The local file URI from expo-image-picker
 * @param {string} mimeType - The mime type of the file (e.g., 'image/jpeg')
 * @param {string} name - The file name
 * @returns {Promise<string>} The uploaded file URL
 */
export const uploadFile = async (uri, mimeType = 'image/jpeg', name = 'upload.jpg') => {
    try {
        const formData = new FormData();
        
        if (Platform.OS === 'web') {
            const response = await fetch(uri);
            const blob = await response.blob();
            formData.append('image', blob, name);
        } else {
            formData.append('image', {
                uri,
                name,
                type: mimeType
            });
        }

        // Use custom multipart/form-data headers
        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });

        if (response.data && response.data.url) {
            return response.data.url;
        }
        throw new Error('Upload failed, no URL returned');
    } catch (error) {
        console.error('File upload error:', error);
        throw error;
    }
};
