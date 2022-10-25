import * as React from 'react';
import {styled} from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({theme}) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error"/>,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error"/>,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning"/>,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success"/>,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success"/>,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const {value, ...other} = props;
    return <span {...other} aria-disabled={true} key={customIcons[value].label}>{customIcons[value].icon}</span>;
}

export default function RadioGroupRating({sentiment}) {
    function sentimentToRating(sentiment) {
        if (sentiment < -20) return 1;
        if (sentiment < -5) return 2;
        if (sentiment < 5) return 3;
        if (sentiment < 20) return 4;
        return 5;
    }

    const rating = sentimentToRating(sentiment);
    console.log(rating)
    console.log(sentiment)
    return (
        <StyledRating
            value={rating}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
        />
    );
}
