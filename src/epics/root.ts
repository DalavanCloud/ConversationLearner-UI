import 'rxjs';
import * as Rx from 'rxjs';
import { combineEpics, ActionsObservable, Epic } from 'redux-observable'
import { State, ActionObject } from '../types'
import { fetchApplicationsEpic, fetchEntitiesEpic, fetchActionsEpic, fetchChatSessionsEpic, fetchTeachSessionsEpic, fetchTrainDialogsEpic, fetchLogDialogsEpic } from './fetchEpics'
import { createNewApplicationEpic, createNewEntityEpic, createNewActionEpic, createNegativeEntity, createNewChatSessionEpic, createNewTeachSessionEpic } from './createEpics'
import { deleteActionEpic, deleteApplicationEpic, deleteEntityEpic, deleteTrainDialogEpic, deleteLogDialogEpic, deleteReverseEntityEpic, deleteSessionEpic, deleteTeachEpic } from './deleteEpics'
import { editActionEpic, editApplicationEpic, editEntityEpic, setBlisApplicationEpic } from './updateEpics'
import { runExtractorEpic, runScorerEpic, scorerFeedbackEpic } from './teachEpics'

const rootEpic = combineEpics(
	fetchApplicationsEpic,
	fetchEntitiesEpic,
	fetchActionsEpic,
	fetchTrainDialogsEpic,
	fetchLogDialogsEpic,
	fetchChatSessionsEpic,
	fetchTeachSessionsEpic,

	createNewApplicationEpic,
	createNewEntityEpic,
	createNewActionEpic,
	createNewChatSessionEpic,
	createNegativeEntity,
	createNewTeachSessionEpic,

	deleteActionEpic,
	deleteApplicationEpic,
	deleteEntityEpic,
	deleteLogDialogEpic,
	deleteReverseEntityEpic,
	deleteSessionEpic,
	deleteTeachEpic,
	deleteTrainDialogEpic,

	editApplicationEpic,
	editActionEpic,
	editEntityEpic,

	setBlisApplicationEpic,
	runExtractorEpic,
	runScorerEpic,
	scorerFeedbackEpic
)

export default rootEpic;