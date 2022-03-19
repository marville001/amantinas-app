import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronUp } from "react-icons/hi";
import {
    loadSuggestionsAction,
    suggestionVoteAction,
} from "../../redux/actions/suggestionsActions";

const SuggestionBoardCard = ({ item }) => {
    const { user } = useSelector((state) => state.userAuthState);
    const dispatch = useDispatch();

    const handleVote = async (vote) => {
        const res = await dispatch(
            suggestionVoteAction({
                vote,
                userId: user._id,
                suggestionId: item._id,
            })
        );
        if (res.success) await dispatch(loadSuggestionsAction());
    };

    return (
        <div className="p-2 rounded flex my-2">
            <div className="flex flex-col items-center justify-start p-2">
                <HiChevronUp
                    onClick={() => handleVote(item.vote + 1)}
                    className="text-3xl text-brown-color cursor-pointer p-0 hover:text-dark-blue-color"
                />
                <span className="-mt-2">{item?.vote}</span>
            </div>
            <div>
                <p className="text-sm text-brown-color font-bold">
                    {item?.subject}
                </p>
                <p className="text-xs mt-2">{item?.suggestion}</p>
                {/* <div className="cursor-pointer text-brown-color mt-4 hover:text-dark-blue-color">
                    Feedback
                </div> */}
            </div>
        </div>
    );
};

export default SuggestionBoardCard;
