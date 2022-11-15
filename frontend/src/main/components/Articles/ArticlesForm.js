import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ArticlesForm({ initialArticles, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialArticles || {} }
    );
    // Stryker enable all

    const navigate = useNavigate();

   // Stryker disable next-line Regex
   const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;


    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialArticles && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="ArticlesForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value= {initialArticles.id}
                        disabled
                    />
                </Form.Group>
            )}


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-title"
                    id="title"
                    type="text"
                    isInvalid={Boolean(errors.title)}
                    {...register("title", {
                        required: "Title is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                {errors.title && 'Title is required. '}
                </Form.Control.Feedback>
            </Form.Group>
            

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="url">Url</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-url"
                    id="url"
                    type="text"
                    isInvalid={Boolean(errors.url)}
                    {...register("url", {
                        required: "Url is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-explanation"
                    id="explanation"
                    type="text"
                    isInvalid={Boolean(errors.explanation)}
                    {...register("explanation", {
                        required: "Explanation is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-email"
                    id="email"
                    type="text"
                    isInvalid={Boolean(errors.email)}
                    {...register("email", {
                        required: "Email is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateAdded">DateAdded (iso format)</Form.Label>
                <Form.Control
                    data-testid="ArticlesForm-dateAdded"
                    id="dateAdded"
                    type="text"
                    isInvalid={Boolean(errors.dateAdded)}
                    {...register("dateAdded", { required: true, pattern: isodate_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateAdded && 'DateAdded is required. '}
                    {errors.dateAdded?.type === 'pattern' && 'DateAdded must be in ISO format, e.g. 2022-01-02T15:30'}
                </Form.Control.Feedback>
            </Form.Group>

            

            <Button
                type="submit"
                data-testid="ArticlesForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="ArticlesForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default ArticlesForm;