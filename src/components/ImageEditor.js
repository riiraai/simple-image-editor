import React, { useState } from "react";
import { FcRemoveImage } from "react-icons/fc";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import { HiDownload } from "react-icons/hi";
import { TbFlipVertical, TbFlipHorizontal } from "react-icons/tb";
import { BiRotateRight, BiRotateLeft } from "react-icons/bi";

function fileSizetoMB(size) {
    return (size && (size / 1024 / 1024)).toFixed(2);
}

const ActionButton = ({ onClick, label, disabled, isWide }) => {
    return (
        <button
            disabled={disabled}
            className={`w-[50px] h-[50px] font-bold py-2 px-4 rounded-md flex-auto ${isWide && "basis-full"} ${disabled ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

function ImageEditor() {
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState({});
    const [undoHistory, setUndoHistory] = useState([]);
    const [redoHistory, setRedoHistory] = useState([]);
    const imageDataFileSize = imageData?.target?.files[0]?.size;

    const handleImageChange = (event) => {
        setImageData(event);
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader?.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFlipX = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.translate(img.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0);
            const flippedImage = canvas.toDataURL();
            setUndoHistory([...undoHistory, image]);
            setImage(flippedImage);
        };
        img.src = image;
    };


    const handleFlipY = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.translate(0, img.height);
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, 0);
            const flippedImage = canvas.toDataURL();
            setUndoHistory([...undoHistory, image]);
            setImage(flippedImage);
        };
        img.src = image;
    };

    const handleRotateLeft = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            const boundingBoxWidth = img.height;
            const boundingBoxHeight = img.width;

            canvas.width = boundingBoxWidth;
            canvas.height = boundingBoxHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((90 * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();
            const flippedImage = canvas.toDataURL();
            setUndoHistory([...undoHistory, image]);
            setImage(flippedImage);
        };
        img.src = image;
    };

    const handleRotateRight = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            const boundingBoxWidth = img.height;
            const boundingBoxHeight = img.width;

            canvas.width = boundingBoxWidth;
            canvas.height = boundingBoxHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((-90 * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();
            const flippedImage = canvas.toDataURL();
            setUndoHistory([...undoHistory, image]);
            setImage(flippedImage);
        };
        img.src = image;
    }

    const handleDownload = () => {
        const downloadLink = document.createElement("a");
        const titleImage = 'edited_' + imageData?.target.files[0].name;
        downloadLink.href = image;
        downloadLink.download = titleImage;
        downloadLink.click();
    }

    const handleUndo = () => {
        if (undoHistory.length === 0) {
            return; // no edits to undo
        }

        const previousImage = undoHistory.pop();
        setRedoHistory((prev) => [...prev, image]);
        setUndoHistory(undoHistory);
        setImage(previousImage);
    };

    const handleRedo = () => {
        if (redoHistory.length === 0) {
            return; // no edits to redo
        }

        const nextImage = redoHistory.pop();
        setUndoHistory((prev) => [...prev, image]);
        setRedoHistory(redoHistory);
        setImage(nextImage);
    };

    const handleCrop = () => {
        // create a canvas element to draw the cropped image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // create an image element to load the original image
        const img = new Image();
        img.onload = () => {
            // set canvas dimensions to match image dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // draw the original image onto the canvas
            ctx.drawImage(img, 0, 0);

            // create a custom rectangle selection
            const selection = {
                x: 50,
                y: 50,
                width: 500,
                height: 500
            };

            // clear the canvas to prepare for cropped image
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // draw the cropped image onto the canvas
            ctx.drawImage(img, selection.x, selection.y, selection.width, selection.height, 0, 0, canvas.width, canvas.height);

            // set the state of the new image
            const croppedImage = canvas.toDataURL();
            setUndoHistory([...undoHistory, image]);
            setImage(croppedImage);
        };
        img.src = image;
    };

    return (
        <div className="flex flex-col items-center">
            <label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <div className="border-2 rounded-lg w-[800px] h-[500px] relative cursor-pointer">
                    {!image ? (
                        <div className="flex flex-col items-center justify-center h-full select-none	">
                            <FcRemoveImage className="text-9xl" />
                            <p className="font-bold text-2xl">No Image Selected</p>
                            <p className="text-gray-500">Click here to select image</p>
                        </div>
                    ) : (
                        <img
                            id="image"
                            src={image}
                            alt="Selected Image"
                            className="w-[800px] h-[500px] object-contain"
                        />
                    )}
                    <div className="flex justify-center items-center w-fit absolute left-0 right-0 bottom-4 ml-auto mr-auto [&>button:not(:last-child)]:mr-1 [&>button]:flex [&>button]:items-center [&>button]:shadow-lg [&>button]:h-[40px] [&>button]:w-fit  [&>button]:min-w-[45px] " >
                        <ActionButton
                            disabled={!image}
                            onClick={handleFlipX}
                            label={<><TbFlipVertical /></>}
                        />
                        <ActionButton
                            disabled={!image}
                            onClick={handleFlipY}
                            label={<><TbFlipHorizontal /></>}
                        />
                        <ActionButton
                            disabled={!image}
                            onClick={handleRotateLeft}
                            label={<><BiRotateLeft /></>}
                        />
                        <ActionButton
                            disabled={!image}
                            onClick={handleRotateRight}
                            label={<><BiRotateRight /></>}
                        />
                        <ActionButton
                            disabled={!image || undoHistory.length === 0}
                            onClick={handleUndo}
                            label={<><RiArrowGoBackLine /></>}
                        />
                        <ActionButton
                            disabled={!image || redoHistory.length === 0}
                            onClick={handleRedo}
                            label={<><RiArrowGoForwardLine /></>}
                        />
                        <ActionButton
                            disabled={!image}
                            onClick={handleDownload}
                            label={
                                <>
                                    <HiDownload className="inline-block" />
                                    <p className="select-none">Download</p>
                                    {imageDataFileSize && (
                                        <sub className="ml-0.5 font-mono text-xs">{'('}{fileSizetoMB(imageDataFileSize)} MB{')'}</sub>
                                    )}
                                </>
                            }
                        />
                    </div>
                </div >
            </label>
        </div>
    );
};

export default ImageEditor;
