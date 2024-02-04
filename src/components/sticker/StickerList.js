import React, { useEffect, useState } from "react"
import { getStickers } from "../../managers/StickerManager.js"
import { useNavigate } from "react-router-dom"
import { deleteSticker } from "../../managers/StickerManager.js"
import fallback_sticker from "../../assets/fallback_sticker.png"
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Fill } from "react-icons/ri";



export const StickerList = (props) => {
    const [stickers, setStickers] = useState([])
    const navigate = useNavigate()


    const getAllStickers = () => {
        getStickers()
            .then((res) => setStickers(res))
    }


    useEffect(() => {
        getAllStickers()
    }, [])

    const handleStickerDelete = (sticker) => {
        deleteSticker(sticker.id)
            .then(() => getAllStickers())
    }

    const addImageFallback = (ev) => {
        ev.target.src = fallback_sticker;
    }


    return (
        <div className="stickerListLayout">
            <div className="stickerList">

                {
                    stickers.map(sticker => {
                        return (
                            <div key={`sticker--${sticker.id}`} className="stickerContainer">
                                <div className="stickerContainerLeft">
                                    <img className="stickerListImg" src={sticker.image} alt="sticker preview thumbnail" onError={addImageFallback} />
                                </div>

                                <div className="stickerContainerRight">
                                    <div className="stickerName">{sticker.name}</div>
                                    <div className="stickerFinishType">${sticker.price} | {sticker.finish_type.finish_type}</div>

                                    <div className="stickerBtnContainer">
                                        <div className="iconBtn">
                                            <GrUpdate className="updateIcon" />
                                            <button className="stickerBtn"
                                                onClick={() => { navigate(`/stickers/update/${sticker.id}`) }}>
                                                Update
                                            </button>
                                        </div>

                                        <div className="iconBtn">
                                            <RiDeleteBin6Fill className="deleteIcon" />
                                            <button className="stickerBtn"
                                                onClick={() => handleStickerDelete(sticker)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}