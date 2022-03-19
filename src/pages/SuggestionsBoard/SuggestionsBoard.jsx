import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import SuggestionModal from "../../components/Modals/SuggestionModal";
import SuggestionBoardCard from "../../components/SuggestionBoardCard/SuggestionBoardCard";
import { loadSuggestionsAction } from "../../redux/actions/suggestionsActions";

const initialData = [
    {
        id: "opinion",
        name: "Need Your Opinion",
        items: [],
    },
    {
        id: "planned",
        name: "Planned",
        items: [],
    },
    {
        id: "progress",
        name: "In Progress",
        items: [],
    },
];

const SuggestionsBoard = () => {
    const { suggestions, loading } = useSelector(
        (state) => state.suggestionsState
    );

    const [suggModalOpen, setSuggModalOpen] = useState(false);
    const [boardData, setBoardData] = useState(initialData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSuggestionsAction());
    }, [dispatch]);

    useEffect(() => {
        if (suggestions.length > 0) {
            const opinion = suggestions.filter(
                (sug) => sug.column === "opinion"
            );
            const planned = suggestions.filter(
                (sug) => sug.column === "planned"
            );
            const progress = suggestions.filter(
                (sug) => sug.column === "progress"
            );

            const data = [
                {
                    id: "opinion",
                    name: "Need Your Opinion",
                    items: [...opinion],
                },
                {
                    id: "planned",
                    name: "Planned",
                    items: [...planned],
                },
                {
                    id: "progress",
                    name: "In Progress",
                    items: [...progress],
                },
            ];

            setBoardData(data);
        }
    }, [suggestions]);

    return (
        <DashboardWrapper title={`Suggestions`}>
            <div className="flex justify-end my-4">
                <button
                    onClick={() => setSuggModalOpen(true)}
                    className="px-8 py-2 bg-primary-blue rounded-lg text-white uppercase dark:bg-gray-primary-color"
                >
                    Submit Suggestion
                </button>
            </div>

            {loading && (
                <div className="flex justify-center my-4">
                    <FaSpinner className="animate-spin mr-4 text-2xl dark:text-white" />
                </div>
            )}

            <ScrollContainer
                className="
      my-10 flex space-x-8 overflow-x-auto board-container select-none  
      "
            >
                {[...boardData].map((board, idx) => (
                    <div
                        key={board.name}
                        className="board flex-1 min-w-[200px] sm:min-w-[300px] bg-white dark:bg-gray-primary-color p-2 flex flex-col max-h-[900px] overflow-y-auto rounded-3xl"
                    >
                        <div>
                            <div className="h-full pb-16">
                                <h2 className="text-md text-center py-3 font-light ml-3 fo text-dark-blue-color dark:text-white">
                                    {board.name}
                                </h2>
                                <hr className="border-0 h-[2px] my-2 mb-8 opacity-50 border-dark-blue-color bg-dark-blue-color dark:border-white dark:bg-white"  />
                                {board.items.length > 0 &&
                                    board.items.map((item, idx) => (
                                        <div key={idx} className="board-item">
                                            <SuggestionBoardCard item={item} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollContainer>

            <SuggestionModal
                isOpen={suggModalOpen}
                closeModal={() => setSuggModalOpen(false)}
            />
        </DashboardWrapper>
    );
};

export default SuggestionsBoard;
