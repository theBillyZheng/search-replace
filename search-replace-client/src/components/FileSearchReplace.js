import { useState } from "react";
import classNames from "classnames";
import { downloadFile, fileSearchReplace } from "../api/FileSearchReplaceAPI";

const FileSearchReplace = () => {
    const [file, setFile] = useState();
    const [searchParam, setSearchParam] = useState('');
    const [replaceParam, setReplaceParam] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isProcessed, setIsProcessed] = useState(false);
    const [resultData, setResultData] = useState();
    const [hasError, setHasError] = useState(false);

    const handleFileUpload = e => {
        if (e.target.files.length !== 1) {
            setFile(null);
            return;
        }
        if (!e.target.files[0].name.match(/.(txt)$/i)) {
            setFile(null);
            alert('not an image');
        } else {
            setFile(e.target.files[0]);
        }
    }

    const isButtonDisabled = !file || !searchParam;

    const buttonClassNames = classNames(
        'w-max text-white font-bold py-2 px-4 rounded',
        {
            'bg-green-500 hover:bg-green-700': !isButtonDisabled,
            'bg-gray-400 hover:bg-gray-500': isButtonDisabled
        }
    );

    const onSearchReplaceClick = async () => {
        setIsProcessed(false);
        setHasError(false);
        setIsProcessing(true);
        try {
            const result = await fileSearchReplace(file, searchParam, replaceParam);
            setResultData(result.data);
            setHasError(false);
            setIsProcessed(true);
        } catch (err) {
            console.error(err);
            setHasError(true);
        }
        setIsProcessing(false);
    }

    return (
        <div className="file-search-replace bg-white rounded-sm grid grid-cols-1 gap-4">
            <label className="block">
                <span>File</span>
                <input
                    className="block mt-2"
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                />
            </label>
            <label className="block">
                <span>Search Parameter</span>
                <input
                    id="search-input"
                    className="block rounded-md w-full mt-2"
                    type="text"
                    value={searchParam}
                    onChange={e => setSearchParam(e.target.value)}
                    required={true}
                />
            </label>
            <label className="block">
                <span>Replacement Parameter</span>
                <input
                    id="replace-input"
                    className="block rounded-md w-full mt-2"
                    type="text"
                    value={replaceParam}
                    onChange={e => setReplaceParam(e.target.value)}
                    required={true}
                />
            </label>
            {isProcessed && !!resultData &&
                <div id="success" className="success bg-green-100 text-green-500 p-3 rounded-md">
                    <div>{`There are ${resultData.occurrences} ocurrences of "${resultData.search}" that have been replaced with "${resultData.replace}"`}</div>
                    <a className="text-green-600 cursor-pointer underline" onClick={() => downloadFile(resultData.fileName)}>Click here</a> to download the resulting file
                </div>
            }
            {hasError &&
                <div className="bg-red-100 text-red-500 p-3 rounded-md">Failed to process result</div>
            }
            <div className="text-right">
                <button
                    className={buttonClassNames}
                    disabled={isButtonDisabled || isProcessing}
                    type="button"
                    onClick={onSearchReplaceClick}
                >
                    Search and Replace
                </button>
            </div>
        </div>
    )
}

export default FileSearchReplace;