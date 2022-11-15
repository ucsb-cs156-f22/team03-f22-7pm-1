import React from 'react';

import MenuItemReviewsForm from "main/components/MenuItemReviews/MenuItemReviewsForm"
import { menuItemReviewsFixtures } from 'fixtures/menuItemReviewsFixtures';

export default {
    title: 'components/MenuItemReviews/MenuItemReviewsForm',
    component: MenuItemReviewsForm
};


const Template = (args) => {
    return (
        <MenuItemReviewsForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    buttonLabel: "Create",
    submitAction: (data) => { console.log('Create was clicked, parameter to submitAction=',data); }
};

export const Show = Template.bind({});

Show.args = {
    initialCommons: menuItemReviewsFixtures.oneReview,
    buttonLabel: "Update",
    submitAction: (data) => { console.log('Update was clicked, parameter to submitAction=',data); }
};
