import OurTable, { ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/MenuItemReviewUtil"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/menuitemreviews",
        method: "DELETE",
        params: {
            code: cell.row.values.code
        }
    }
}

export default function MenuItemReviewsTable({ menuitemreviews, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/menuitemreviews/edit/${cell.row.values.code}`)
    }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/menuitemreviews/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', 
        },
        {
            Header: 'ItemId',
            accessor: 'itemId',
        },
        {
            Header: 'Reviewer Email',
            id: 'reviewerEmail', // needed for tests

        },
        {
            Header: 'Stars 1-5',
            id: 'stars', // needed for tests
            
        },
        {
            Header: 'Date Reviewed',
            accessor: 'dateReviewed',
        },
        {
            Header: 'Comments',
            accessor: 'Comments',
        }
    ];

    const testid = "DiningCommonsTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={menuitemreviews}
        columns={columnsToDisplay}
        testid={testid}
    />;
};