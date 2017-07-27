import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TrainingGroundArenaHeader from '../components/TrainingGroundArenaHeader'
import { DetailsList, CommandButton, Link, CheckboxVisibility, IColumn, SearchBox } from 'office-ui-fabric-react';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { setDisplayMode, setWebchatDisplay, setCurrentLogDialog, setCurrentChatSession } from '../actions/updateActions'
import { createLogDialog, createChatSession } from '../actions/createActions'
import { deleteChatSession } from '../actions/deleteActions'
import { State } from '../types'
import { LogDialog, Session } from 'blis-models'
import { DisplayMode } from '../types/const';

let columns: IColumn[] = [
    {
        key: 'firstUtterance',
        name: 'First Utterance',
        fieldName: 'firstUtterance',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'turns',
        name: 'Turns',
        fieldName: 'dialog',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'lastEdit',
        name: 'Last Edit',
        fieldName: 'lastEdit',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'id',
        name: 'DialogID',
        fieldName: 'id',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
];

class LogDialogsList extends React.Component<any, any> {
    constructor(p: any) {
        super(p);
        this.state = {
            searchValue: ''
        }
    }
    renderItemColumn(item?: any, index?: number, column?: IColumn) {
        let self = this;
        let fieldContent = item[column.fieldName];
        switch (column.key) {
            case 'turns':
                return <span className='ms-font-m-plus'>{fieldContent.turns.length}</span>;
            default:
                return <span className='ms-font-m-plus'>{fieldContent}</span>;
        }
    }
    handleClick() {
        this.props.setDisplayMode(DisplayMode.Session);
    }
    generateGUID(): string {
        let d = new Date().getTime();
        let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (char == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }
    onChange(newValue: string) {
        let lcString = newValue.toLowerCase();
        this.setState({
            searchValue: lcString
        })
    }
    renderLogDialogItems(): LogDialog[] {
        let lcString = this.state.searchValue.toLowerCase();
        let filteredLogDialogs = this.props.logDialogs.all.filter((logDialogItems: LogDialog) => {
            return true
        })
        return filteredLogDialogs;
    }
    render() {
        let logDialogItems: any[] = [];
        console.log('log dialog list', this.props.chatSessions)
        return (
            <div>
                <TrainingGroundArenaHeader title="Log Dialogs" description="Use this tool to test the current versions of your application, to check if you are progressing on the right track ..." />
                <div className="entityCreator">
                    <CommandButton
                        data-automation-id='randomID20'
                        disabled={false}
                        onClick={this.handleClick.bind(this)}
                        className='goldButton'
                        ariaDescription='Create a New Chat Session'
                        text='New Chat Session'
                    />
                </div>
                <SearchBox
                    className="ms-font-m-plus"
                    onChange={(newValue) => this.onChange(newValue)}
                    onSearch={(newValue) => this.onChange(newValue)}
                />
                <DetailsList
                    className="ms-font-m-plus"
                    items={logDialogItems}
                    columns={columns}
                    checkboxVisibility={CheckboxVisibility.hidden}
                    onRenderItemColumn={this.renderItemColumn.bind(this)}
                    onActiveItemChanged={() => console.log("we need to come up with some other view when looking at past sessions")}
                />
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        setDisplayMode: setDisplayMode,
  //      setWebchatDisplay: setWebchatDisplay, TODO -get rid of me
        createChatSession: createChatSession,
        deleteChatSession: deleteChatSession,
        setCurrentChatSession: setCurrentChatSession
    }, dispatch)
}
const mapStateToProps = (state: State) => {
    return {
        logDialogs: state.logDialogs,
        userKey: state.user.key,
        apps: state.apps,
        chatSessions: state.chatSessions
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogDialogsList);