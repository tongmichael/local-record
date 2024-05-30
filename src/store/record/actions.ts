import { getDraft} from '../../api/draft'
import { getPortal } from "../../api/portal";

export default {
    async getPortal({state, commit}:any) {
        let portal = null;
        let draft = null;

        portal = await getPortal();
        commit('setPortal', portal);

        if(portal.portalDraftId) {
            draft = await getDraft(portal.portalDraftId);
            commit('setDraft', draft);
        }

        if(state.version === 'portal') {
            commit('setCurrentNode', JSON.parse(portal.data)[0])
        } else if(state.version === 'draft') {
            commit('setCurrentNode', JSON.parse(draft.data)[0])
        }
    }
}