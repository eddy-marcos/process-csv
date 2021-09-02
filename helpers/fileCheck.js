import isEmpty from 'lodash';

export default function data() {
    const errors = {};
    if (isEmpty(data.providerName)) {
        errors.providerName = 'provider name is missing';
    }

    if (isEmpty(data.file)) {
        errors.file = 'file is missing';
    }

    return {
        errors,
        isCorrect: isEmpty(errors)
    };
};