/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import * as React from 'react';
import { returntypeof } from 'react-redux-typescript';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import * as OF from 'office-ui-fabric-react'
import { State } from '../../types'
import { FM } from '../../react-intl-messages'
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl'
import { ReplayError, ReplayErrorType, ReplayErrorMissingAction, ReplayErrorMissingEntity, ReplayErrorActionUnavailable, ReplayErrorEntityDiscrepancy } from '@conversationlearner/models'

export function renderReplayError(replayError: ReplayError): JSX.Element {
    switch (replayError.type) {
        case ReplayErrorType.MissingAction:
            return (
                <div className={OF.FontClassNames.mediumPlus}>
                    <FormattedMessage
                        id={FM.REPLAYERROR_DESC_MISSING_ACTION}
                        defaultMessage={FM.REPLAYERROR_DESC_MISSING_ACTION}
                    />
                    {` "${(replayError as ReplayErrorMissingAction).lastUserInput}"`}
                </div>
            )
        case ReplayErrorType.MissingEntity:
            return (
                <div className={OF.FontClassNames.mediumPlus}>
                    <FormattedMessage
                        id={FM.REPLAYERROR_DESC_MISSING_ENTITY}
                        defaultMessage={FM.REPLAYERROR_DESC_MISSING_ENTITY}
                    />
                    {` "${(replayError as ReplayErrorMissingEntity).value}"`}
                </div>
            )
        case ReplayErrorType.ActionUnavailable:
            return (
                <div className={OF.FontClassNames.mediumPlus}>
                    <FormattedMessage
                        id={FM.REPLAYERROR_DESC_UNAVAILABLE_ACTION}
                        defaultMessage={FM.REPLAYERROR_DESC_UNAVAILABLE_ACTION}
                    />
                    {` "${(replayError as ReplayErrorActionUnavailable).lastUserInput}"`}
                </div>
            )
        case ReplayErrorType.ActionAfterWait:
            return (
                <div className={OF.FontClassNames.mediumPlus}>
                    <FormattedMessage
                        id={FM.REPLAYERROR_DESC_ACTION_AFTER_WAIT}
                        defaultMessage={FM.REPLAYERROR_DESC_ACTION_AFTER_WAIT}
                    />
                </div>
            )
        case ReplayErrorType.TwoUserInputs:
            return (
                <div className={OF.FontClassNames.mediumPlus}>
                    <FormattedMessage
                        id={FM.REPLAYERROR_DESC_TWO_USER_INPUTS}
                        defaultMessage={FM.REPLAYERROR_DESC_TWO_USER_INPUTS}
                    />
                </div>
            )
        case ReplayErrorType.InputAfterNonWait:
            return (
                <div className={OF.FontClassNames.mediumPlus}>
                    <FormattedMessage
                        id={FM.REPLAYERROR_DESC_INPUT_AFTER_NONWAIT}
                        defaultMessage={FM.REPLAYERROR_DESC_INPUT_AFTER_NONWAIT}
                    />
                </div>
            )
            //LARS - think this can go away?  check
        case ReplayErrorType.EntityDiscrepancy:
            let entityDiscrepancy = replayError as ReplayErrorEntityDiscrepancy;
            return (
                    <OF.TooltipHost  
                        id='myID' 
                        delay={ OF.TooltipDelay.zero }
                        calloutProps={ { gapSpace: 0 } }
                        tooltipProps={ {
                            onRenderContent: () => {
                                return (
                                    <div className={OF.FontClassNames.mediumPlus}>
                                        <div className="cl-font--emphasis">Original Entities:</div>
                                        {entityDiscrepancy.originalEntities.length > 0 ?
                                            entityDiscrepancy.originalEntities.map((e: any) => (<div className={OF.FontClassNames.mediumPlus}>{e}</div>))
                                            : <div className={OF.FontClassNames.mediumPlus}>-none-</div>
                                        }
                                        <div className="cl-font--emphasis">New Entities:</div>
                                        {entityDiscrepancy.newEntities.length > 0 ?
                                            entityDiscrepancy.newEntities.map((e: any) => (<div className={OF.FontClassNames.mediumPlus}>{e}</div>))
                                            : <div className={OF.FontClassNames.mediumPlus}>-none-</div>
                                        }
                                    </div>
                                );
                                }
                          } }
                        >
                        <div className={OF.FontClassNames.mediumPlus}>
                            <FormattedMessage
                                id={FM.REPLAYERROR_DESC_CHANGED_ENTITIES}
                                defaultMessage={FM.REPLAYERROR_DESC_CHANGED_ENTITIES}
                            />
                            {` "${entityDiscrepancy.lastUserInput}"`}
                            <OF.Icon iconName="Info" className="cl-icon" />
                        </div>
                    </OF.TooltipHost>
            )
        default:
            throw new Error('Unhandled ReplayErrorType case');
    }
}

class ReplayErrorList extends React.Component<Props, {}> {
    render() {
        const { intl, formattedTitleId, formattedMessageId } = this.props
        return (
            <Modal
                isOpen={this.props.open}
                onDismiss={this.props.onClose}
                isBlocking={true}
                containerClassName="cl-modal cl-modal--small"
            >
                <div className="cl-modal_header">
                    <span className={OF.FontClassNames.xxLarge}>
                        {formattedTitleId && <FormattedMessage
                            id={this.props.formattedTitleId}
                            defaultMessage="Default Error Title"
                        />}
                    </span>
                </div>
                <div className="cl-modal_subheader cl-underline">
                    <span className={OF.FontClassNames.mediumPlus}>
                        {formattedMessageId && <FormattedMessage
                            id={this.props.formattedMessageId}
                            defaultMessage="Default Error Message"
                        />}
                    </span>
                </div>
                <OF.List
                    className={OF.FontClassNames.medium}
                    items={this.props.textItems}
                    onRenderCell={renderReplayError}
                />
                <div className="cl-modal_footer">
                    <div className="cl-modal-buttons">
                        <div className="cl-modal-buttons_primary">
                            <OF.PrimaryButton
                                onClick={this.props.onClose}
                                ariaDescription={intl.formatMessage({
                                    id: FM.BUTTON_OK,
                                    defaultMessage: 'OK'
                                })}
                                text={intl.formatMessage({
                                    id: FM.BUTTON_OK,
                                    defaultMessage: 'OK'
                                })}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
    }, dispatch);
}
const mapStateToProps = (state: State) => {
    return {
    }
}

export interface ReceivedProps {
    open: boolean
    formattedTitleId: string
    formattedMessageId: string
    textItems: ReplayError[]
    onClose: () => void
}

// Props types inferred from mapStateToProps & dispatchToProps
const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps & ReceivedProps & InjectedIntlProps

export default connect<typeof stateProps, typeof dispatchProps, ReceivedProps>(mapStateToProps, mapDispatchToProps)(injectIntl(ReplayErrorList))

