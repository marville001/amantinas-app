import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronUp, HiDotsVertical } from "react-icons/hi";
import {
    deleteSuggestionAction,
    loadSuggestionsAction,
    suggestionVoteAction,
} from "../../redux/actions/suggestionsActions";
import { Menu } from "@headlessui/react";

const SuggestionBoardCard = ({ item }) => {
    const { admin } = useSelector((state) => state.adminState);
    const dispatch = useDispatch();

    const handleVote = async (vote) => {
        const res = await dispatch(
            suggestionVoteAction(
                {
                    vote,
                    userId: admin._id,
                    suggestionId: item._id,
                },
                "admin"
            )
        );
        if (res.success) await dispatch(loadSuggestionsAction("admin"));
    };

    const handleDelete = async (id) => {
        const res = await dispatch(
            deleteSuggestionAction({ suggestionId: id })
        );

        if (res.success) {
            dispatch(loadSuggestionsAction("admin"));
        }
    };

    return (
        <div className="p-2 rounded flex my-2">
            <div className="flex flex-col items-center justify-start p-2">
                <HiChevronUp
                    onClick={() => handleVote(item.vote + 1)}
                    className="text-3xl text-brown-color cursor-pointer p-0 hover:text-dark-color"
                />
                <span className="-mt-2">{item?.vote}</span>
            </div>
            <div className="w-full relative">
                <div className="flex justify-between w-full">
                    <p className="text-sm text-brown-color font-bold">
                        {item?.subject}
                    </p>
                    <Menu as="div" className="relative">
                        <Menu.Button>
                            <HiDotsVertical />
                        </Menu.Button>
                        <Menu.Items
                            className="absolute right-0
                         bg-white p-4 shadow-md rounded-md z-50 ring-0 outline-none border-0"
                        >
                            <Menu.Item
                                onClick={() => handleDelete(item._id)}
                                className="cursor-pointer text-xs"
                                as="div"
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
                <p className="text-xs mt-2">{item?.suggestion}</p>
                {/* <div className="cursor-pointer text-brown-color mt-4 hover:text-dark-color">
                    Feedback
                </div> */}
            </div>
        </div>
    );
};

export default SuggestionBoardCard;
