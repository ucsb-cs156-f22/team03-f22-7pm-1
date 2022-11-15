import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function HelpRequestForm({ initialHelpRequest, submitAction, buttonLabel="Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialHelpRequest || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line all
    //const yyyyq_regex = /((19)|(20))\d{2}[1-4]/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialHelpRequest && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Code</Form.Label>
                    <Form.Control
                        data-testid="HelpRequestForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialHelpRequest.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requesterEmail">Requester Email</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-requesterEmail"
                    id="requesterEmail"
                    type="text"
                    isInvalid={Boolean(errors.requesterEmail)}
                    {...register("requesterEmail", { required: "Email is required."})} />
                <Form.Control.Feedback type="invalid">
                    {errors.requesterEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="teamId">TeamId</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-teamId"
                    id="teamId"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("teamId", {
                        required: "TeamId is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.teamId?.message}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="tableOrBreakoutRoom">Table Or BreakoutRoom</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-tableOrBreakoutRoom"
                    id="tableOrBreakoutRoom"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("tableOrBreakoutRoom", {
                        required: "Table or BreakoutRoom is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.tableOrBreakoutRoom?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requestTime">Request Time & Date (iso format)</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-requestTime"
                    id="requestTime"
                    type="text"
                    isInvalid={Boolean(errors.localDateTime)}
                    {...register("requestTime", { required: true, pattern: isodate_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.requestTime && 'Request Time & Date is required.'}
                    {errors.requestTime?.type === 'pattern' && 'requestTime must be in ISO format, e.g. 2022-01-02T15:30'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid="HelpRequestForm-explanation"
                    id="explanation"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("explanation", {
                        required: "Explanation is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="solved">Solved?</Form.Label>
                <Form.Check
                    data-testid="HelpRequestForm-solved"
                    type="checkbox"
                    id="solved"
                    {...register("solved")}
                />
            </Form.Group>


            <Button
                type="submit"
                data-testid="HelpRequestForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="HelpRequestForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default HelpRequestForm;
