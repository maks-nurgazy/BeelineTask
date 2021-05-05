import React from 'react';
import Card from './Card';
import Grid from './Grid';
import StyledLink from "./StyledLink";


function TestKit({tests}) {

    const element = tests.items && tests.items.map((obj, index) => (
        <StyledLink key={obj.id} to={`/tests/${obj.name_url}`}>
            <Card
                title={obj.name}
                subTitle={obj.total_questions}/>
        </StyledLink>
    ));

    return (
        <Grid>
            {element}
        </Grid>
    );
}

export default TestKit;