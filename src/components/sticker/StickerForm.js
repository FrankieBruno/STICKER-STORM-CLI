import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    createSticker,
    getFinishTypes,
    getStickerSizes,
    getStickers,
} from "../../managers/StickerManager.js";
import backupImage from "../../assets/imagePreviewFallback.png"

export const StickerForm = () => {
    const navigate = useNavigate();
    const [stickers, setStickers] = useState([]);
    const [finishTypes, setFinishTypes] = useState([]);
    const [stickerSizes, setStickerSizes] = useState([]);
    const [stickerObj, setStickerObj] = useState({
        name: "",
        image: "",
        finish_type: 1,
        sticker_size: 1,
        price: 0,
    });

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentSticker, setCurrentSticker] = useState({
        name: "",
        image: "",
        finish_type: 0,
        sticker_size: 0,
        price: "",
    });

    useEffect(() => {
        //in this section I am grabbing my sticker types from my StickerManager.js...//
        //importing them into my file then setting my state for the game types//
        // TODO: Get all sticker, then set the state
        console.log(stickers);
        getStickers().then((res) => setStickers(res));
    }, [stickers]);

    useEffect(() => {
        //in this section I am grabbing my sticker types from my StickerManager.js...//
        //importing them into my file then setting my state for the game types//
        // TODO: Get the finish types, then set the state
        getFinishTypes().then((res) => setFinishTypes(res));
    }, []);

    useEffect(() => {
        //in this section I am grabbing my sticker types from my StickerManager.js...//
        //importing them into my file then setting my state for the game types//
        // TODO: Get the finish types, then set the state
        getStickerSizes().then((res) => setStickerSizes(res));
    }, []);


    const handleImgError = (e) => {
        e.stopPropagation();
        e.target.src = backupImage; 
        // setStickerImgPreview(backupImage);
    }
    /* I need to make input fields for maker(done), number_of_players, skill_level, game_type, gamer*/
    return (
        <div className="stickerFormLayout">
            <div className="leftView">
                <form className="stickerForm px-1 bg-primary">
                    <h2 className="stickerForm__title text-3xl text-center pt-4 pb-6 text-secondary text-white">
                        Make New Sticker
                    </h2>

                    <div className="boxInput">
                        <input
                            type="text"
                            name="name"
                            required
                            autoFocus
                            className="form-control"
                            value={stickerObj.name}
                            placeholder="Name"
                            onChange={(e) => setStickerObj({ ...stickerObj, name: e.target.value })}
                        />
                    </div>

                    <div className="boxInput">
                        <input
                            type="text"
                            name="image"
                            required
                            autoFocus
                            className="form-control"
                            value={stickerObj.image}
                            placeholder="Image URL"
                            onChange={(e) => setStickerObj({ ...stickerObj, image: e.target.value })}
                        />
                    </div>

                    <div className="boxDropdown">
                        <label htmlFor="finish_type">Finish Type</label>
                        <select
                            name="finish_type"
                            id="finish"
                            value={stickerObj.finish_type}
                            onChange={(e) => {
                                // const type = finishTypes.find((ft) => ft.id === parseInt(e.target.value));
                                setStickerObj({ ...stickerObj, finish_type: e.target.value })
                            }}
                        >
                            {/* <option value=""></option> */}
                            {finishTypes.map((finishType) => (
                                <option key={finishType.id} value={finishType.id}>
                                    {finishType.finish_type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="boxDropdown">
                        <label htmlFor="sticker_size">Size</label>
                        <select
                            name="sticker_size"
                            id="size"
                            value={stickerObj.sticker_size}
                            onChange={(e) => {
                                // const size = stickerSizes.find((ss) => ss.id === parseInt(e.target.value));
                                setStickerObj({ ...stickerObj, sticker_size: e.target.value })
                            }}
                        >
                            {/* <option value=""></option> */}
                            {stickerSizes.map((stickerSize) => (
                                <option key={stickerSize.id} value={stickerSize.id}>
                                    {stickerSizes.find(i => i.id === stickerSize.id).sticker_size}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="boxDropdown">
                        <label htmlFor="price">Price - $</label>
                        <input
                            type="number"
                            name="price"
                            required
                            autoFocus
                            className="form-control"
                            min={0}
                            max={1000}
                            value={stickerObj.price}
                            onChange={(e) => setStickerObj({ ...stickerObj, price: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={(evt) => {
                            // Prevent form from being submitted
                            evt.preventDefault();

                            const finalStickerObj = {
                                name: stickerObj.name,
                                image: stickerObj.image,
                                finish_type: stickerObj.finish_type,
                                sticker_size: parseInt(stickerObj.sticker_size),
                                price: parseInt(stickerObj.price),
                            };
                            // Send POST request to your API
                            createSticker(finalStickerObj).then(() => navigate("/stickers"));
                        }}
                        className="createButton"
                    >
                        ${stickerObj.price} Create
                    </button>
                </form>
            </div>

            <div className="rightView">
                <img className="rightImg" src={stickerObj.image} onError={handleImgError} alt="Sticker Preview" />
            </div>
        </div>
    );
};
