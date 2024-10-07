export const buttons: string[] = [
    'AC', '%', 'backspace', 'division',
    '7', '8', '9', 'multiplication',
    '4', '5', '6', 'minus',
    '1', '2', '3', 'plus',
    '00', '0', '.', 'equal'
];

export const iconNames: string[] = ['backspace', 'division', 'multiplication', 'minus', 'plus', 'equal'];

export const operatorMap: { [key: string]: string } = {
    plus: '+',
    minus: '-',
    multiplication: '*',
    division: '/'
};

export const calculate = (inputArray: string[], result: string): string => {
    try {
        const inputString = inputArray.join('');
        if (['+', '-', '*', '/'].includes(inputString[inputString.length - 1])) {
            return result;
        }
        const res = eval(inputString);
        return formatResult(res);
    } catch (error) {
        return 'Error';
    }
};

export const formatResult = (result: number): string => {
    let formattedResult = result.toString();
    if (formattedResult.length >= 12) {
        formattedResult = result.toExponential(6);
    }
    return formattedResult.replace('+', '');
};

export const handleInput = (inputArray: string[], value: string, result: string) => {
    const operator = operatorMap[value] || value;
    const tempInputArray = [...inputArray];

    if (inputArray.length > 0) {
        const lastChar = inputArray[inputArray.length - 1];

        if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(operator)) {
            return { inputArray: tempInputArray, result };
        }

        if (!['+', '-', '*', '/'].includes(operator)) {
            if (['+', '-', '*', '/'].includes(lastChar)) {
                tempInputArray.push(operator);
            } else {
                tempInputArray[tempInputArray.length - 1] += operator;
            }
        } else {
            tempInputArray.push(operator);
        }
        return { inputArray: tempInputArray, result: calculate(tempInputArray, result) };
    } else if (!['+', '-', '*', '/'].includes(operator)) {
        return { inputArray: [operator], result: '' };
    }
    return { inputArray: tempInputArray, result };
};

export const handleOperatorAfterResult = (operator: string, result: string) => {
    return { inputArray: [result, operator], result: '' };
};