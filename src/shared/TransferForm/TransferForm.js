import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash-es/get';
import { getFormValues } from 'redux-form';
import Form from 'yii-steroids/ui/form/Form';
import InputField from 'yii-steroids/ui/form/InputField';
import NumberField from 'yii-steroids/ui/form/NumberField';
import Button from 'yii-steroids/ui/form/Button';
// import { onlyDecimalRegex } from 'ui/global/helpers';

import { html } from 'components';
import './TransferForm.scss';

const bem = html.bem('TransferForm');

@connect((state, props) => ({
    formValues: getFormValues(props.formId)(state)
}))
export default class TransferForm extends React.PureComponent {
    static propTypes = {
        formId: PropTypes.string,
        onSubmit: PropTypes.func,
        buttonLabel: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {
        const address = _get(this.props, 'formValues.address');
        const amount = _get(this.props, 'formValues.amount');

        return (
            <Form
                className={bem.block()}
                formId={this.props.formId}
                onSubmit={() => this.props.onSubmit(address, amount)}
            >
                <InputField
                    layoutClassName={bem.element('input')}
                    attribute={'address'}
                    label={__('Transfer recipient')}
                    inputProps={{
                        autoComplete: 'off'
                    }}
                />
                <NumberField
                    min={1}
                    step="any"
                    inputProps={{
                        autoComplete: 'off'
                    }}
                    label={__('Transfer amount')}
                    layoutClassName={bem.element('input')}
                    attribute={'amount'}
                />
                <Button
                    label={this.props.buttonLabel || __('Transfer')}
                    color={'success'}
                    type={'submit'}
                    disabled={!amount || !address}
                    className={bem.element('submit-button')}
                />
            </Form>
        );
    }
}
