```javascript
const user = {
    id,
    email,
    firstName,
    lastName
}

const portfolio = {
    id,
    owner,
    draft: {
        template: {
            name: 'turmeric',
            version,
        },
        templateSettings: {
            turmeric: {
                theme: 'dark',
                font: 'roboto'
            }
        },
        content: {
            projects: [{
                id,
                name,
                media: [{
                    type,
                    url,
                    crop
                }],
                startDate,
                endDate
            }],
            jobs: [{
                id,
                company,
                title,
                role,
                shortDescription,
                longDescription,
                media: [{
                    id,
                    type,
                    url,
                    crop
                }],
                startDate,
                endDate
            }],
            education: [{
                id,
                institution,
                degree,
                role,
                shortDescription,
                longDescription,
                media: [{
                    id,
                    type,
                    url,
                    crop
                }],
                startDate,
                endDate
            }]
        }
    },
    published: {
        template: {
            name: 'turmeric',
            version,
        },
        templateSettings: {
            turmeric: {
                theme: 'dark',
                font: 'roboto'
            }
        },
        content: {
            projects: [{
                id,
                name,
                media: [{
                    type,
                    url,
                    crop
                }],
                startDate,
                endDate
            }],
            jobs: [{
                id,
                company,
                title,
                role,
                shortDescription,
                longDescription,
                media: [{
                    id,
                    type,
                    url,
                    crop
                }],
                startDate,
                endDate
            }],
            education: [{
                id,
                institution,
                degree,
                role,
                shortDescription,
                longDescription,
                media: [{
                    id,
                    type,
                    url,
                    crop
                }],
                startDate,
                endDate
            }]
        }
    }
}
```