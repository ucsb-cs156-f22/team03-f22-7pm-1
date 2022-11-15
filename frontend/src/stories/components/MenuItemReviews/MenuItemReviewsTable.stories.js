import React from 'react';

import MenuItemReviewsTable from "main/components/MenuItemReviews/MenuItemReviewsTable";
import { menuItemReviewsFixtures } from 'fixtures/menuItemReviewsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/MenuItemReviews/MenuItemReviewsTable',
    component: MenuItemReviewsTable
};

const Template = (args) => {
    return (
        <MenuItemReviewsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuitemreviews: []
};

export const ThreeReviews = Template.bind({});

ThreeReviews.args = {
    menuitemreviews: menuItemReviewsFixtures.threeReviews
};

export const ThreeReviewsAsAdmin = Template.bind({});

ThreeReviewsAsAdmin.args = {
    menuitemreviews: menuItemReviewsFixtures.threeReviews,
    currentUser: currentUserFixtures.adminUser
};

