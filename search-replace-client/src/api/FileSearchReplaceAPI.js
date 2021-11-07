import { post } from 'axios';

const API_PORT = 3001;

export async function fileSearchReplace(file, search, replace) {
    const formData  = new FormData();
    formData.append('search', search);
    formData.append('replace', replace);
    formData.append('file', file);

    return post('/file/search-replace', formData);
}

export function downloadFile(fileName) {
    window.location.href = `${window.location.protocol}//${window.location.hostname}:${API_PORT}/file/download?fileName=${fileName}`;
}