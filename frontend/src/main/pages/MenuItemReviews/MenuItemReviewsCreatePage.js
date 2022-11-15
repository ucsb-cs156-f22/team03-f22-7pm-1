import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import MenuItemReviewsForm from "main/components/MenuItemReviews/MenuItemReviewsForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function MenuItemReviewsCreatePage() {

  const objectToAxiosParams = (reviews) => ({
    url: "/api/menuitemreviews/post",
    method: "POST",
    params: {
      id: reviews.id,
      itemId: reviews.itemId,
      reviewerEmail: reviews.reviewerEmail,
      stars: reviews.stars,
      dateReviewed: reviews.dateReviewed,
      comments: reviews.comments,
    }
  });

  const onSuccess = (reviews) => {
    toast(`New Menu Item Review Created - id: ${reviews.id} itemId: ${reviews.itemId}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/menuitemreviews/all"]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/menuitemreviews/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Menu Item reviews</h1>

        <MenuItemReviewsForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}