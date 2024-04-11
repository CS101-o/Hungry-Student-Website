import {RiMoneyPoundCircleLine} from 'react-icons/ri'
function diffStatus(difficultyLevel) {

    if (difficultyLevel == '1') {
        return <>easy</>;
    } else if (difficultyLevel == '2') {
        return <>not hard</>;
    } else if (difficultyLevel == '2') {
        return <>hard</>;
    }
    return <>easy</>;
}

function budgetStatus(budgetLevel) {

    if (budgetLevel == '1') {
        return <><RiMoneyPoundCircleLine /></>
    } else if (budgetLevel == '2') {
        return <><RiMoneyPoundCircleLine /><RiMoneyPoundCircleLine /></>
    } else if (budgetLevel == '3') {
        return <><RiMoneyPoundCircleLine /><RiMoneyPoundCircleLine /><RiMoneyPoundCircleLine /></>
    }
    return <></>
}

export {diffStatus, budgetStatus};
