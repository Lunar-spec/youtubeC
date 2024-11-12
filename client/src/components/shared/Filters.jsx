import { useDispatch, useSelector } from 'react-redux';
import { BsSliders2 } from "react-icons/bs";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { filterSlice } from '../../redux/filterSlice';
import PropTypes from 'prop-types';

const Filters = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);

    const handleFilterClick = (category, value) => {
        dispatch(filterSlice.actions.setFilters({ category, value }));
    };

    const handleClearFilters = () => {
        dispatch(filterSlice.actions.clearFilters());
    };

    const hasActiveFilters = () => {
        return filters.uploadDate ||
            filters.duration ||
            filters.features?.length > 0 ||
            filters.sortBy !== "Relevance";
    };

    const FilterOption = ({ category, value }) => {
        const isOptionSelected = category === 'features'
            ? filters.features?.includes(value)
            : filters[category] === value;

        return (
            <button
                onClick={() => handleFilterClick(category, value)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 hover:rounded-md transition-all
                    ${isOptionSelected ? 'font-bold bg-gray-100 rounded-md' : 'font-normal'}
                `}
            >
                {value}
            </button>
        );
    };

    FilterOption.propTypes = {
        category: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full py-1 flex items-center gap-2">
                    Filters
                    <BsSliders2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader className="flex flex-row items-center justify-between border-b pb-2">
                    <DialogTitle className="text-xl">Search filters</DialogTitle>
                </DialogHeader>
                <DialogDescription className="px-4 py-2">
                    This dialog contains filters to refine your video search.
                </DialogDescription>

                <ScrollArea className="max-h-[calc(80vh-80px)]"> {/* Adjusted to account for footer */}
                    <div className="grid grid-cols-4 gap-6 p-4">
                        {/* Upload Date Column */}
                        <div>
                            <Label className="font-semibold text-gray-900 mb-2 block">
                                UPLOAD DATE
                            </Label>
                            <div className="space-y-1">
                                <FilterOption category="uploadDate" value="Last hour" />
                                <FilterOption category="uploadDate" value="Today" />
                                <FilterOption category="uploadDate" value="This week" />
                                <FilterOption category="uploadDate" value="This month" />
                                <FilterOption category="uploadDate" value="This year" />
                            </div>
                        </div>

                        {/* Duration Column */}
                        <div>
                            <Label className="font-semibold text-gray-900 mb-2 block">
                                DURATION
                            </Label>
                            <div className="space-y-1">
                                <FilterOption category="duration" value="Under 4 minutes" />
                                <FilterOption category="duration" value="4 - 20 minutes" />
                                <FilterOption category="duration" value="Over 20 minutes" />
                            </div>
                        </div>

                        {/* Features Column */}
                        <div>
                            <Label className="font-semibold text-gray-900 mb-2 block">
                                FEATURES
                            </Label>
                            <div className="space-y-1">
                                <FilterOption category="features" value="Comments" />
                                <FilterOption category="features" value="Liked" />
                            </div>
                        </div>

                        {/* Sort By Column */}
                        <div>
                            <Label className="font-semibold text-gray-900 mb-2 block">
                                SORT BY
                            </Label>
                            <div className="space-y-1">
                                <FilterOption category="sortBy" value="Relevance" />
                                <FilterOption category="sortBy" value="Upload date" />
                                <FilterOption category="sortBy" value="View count" />
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <DialogFooter className="flex justify-between items-center border-t pt-4">
                    <Button
                        variant="ghost"
                        onClick={handleClearFilters}
                        className={`${!hasActiveFilters() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!hasActiveFilters()}
                    >
                        Clear filters
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Filters;