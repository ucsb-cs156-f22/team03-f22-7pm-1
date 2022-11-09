import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function MenuItemReviewsForm({ initialMenuItemReview, submitAction, buttonLabel="Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialMenuItemReview || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line all
    const yyyyq_regex = /((19)|(20))\d{2}[1-4]/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialMenuItemReview && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="MenuItemReviewsForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialMenuItemReview.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="itemId">ItemId</Form.Label>
                <Form.Control
                    data-testid="MenuItemReviewsForm-itemId"
                    id="itemId"
                    type="text"
                    isInvalid={Boolean(errors.itemId)}
                    {...register("itemId", {
                        required: "itemId is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="Stars">Name</Form.Label>
                <Form.Control
                    data-testid="MenuItemReviewsForm-stars"
                    id="stars"
                    type="number"
                    isInvalid={Boolean(errors.name)}
                    {...register("stars", {
                        required: "stars is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="reviewerEmail">Name</Form.Label>
                <Form.Control
                    data-testid="MenuItemReviewsForm-reviewerEmail"
                    id="reviewerEmail"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("reviewerEmail", {
                        required: "reviewerEmail is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateReviewed">Date (iso format)</Form.Label>
                <Form.Control
                    data-testid="MenuItemReviewsForm-dateReviewed"
                    id="dateReviewed"
                    type="text"
                    isInvalid={Boolean(errors.dateReviewed)}
                    {...register("localDateTime", { required: true, pattern: isodate_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateReviewed && 'dateReviewed is required. '}
                    {errors.dateReviewed?.type === 'pattern' && 'localDateTime must be in ISO format, e.g. 2022-01-02T15:30'}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="comments">Name</Form.Label>
                <Form.Control
                    data-testid="MenuItemReviewsForm-comments"
                    id="comments"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("comments", {
                        required: "comments is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="MenuItemReviewsForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="MenuItemReviewsForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default UCSBDateForm;
