/*************************************************
*
* Make A Sale requires free navigation between tabs.
* This requires precise handling of different screen states
* Later screens depend on choices in previous ones.
*
*************************************************/

// First launch : General Initialization and create any objects necessary
export function init(data, opportunity) {
    // Initalize objects if they dont exist (rentalDetail, closingDetail, etc)
}

// At launch, load all data
export function loadAllData(data, opportunity) {
    // Populate all data here : fetch all lists etc.
}

/*
// State machine template. Should update UI when it changes
masState : {
    contact_screen : {
        "is_completed" : "true", // current screen has full info. Will define if we can navigate directly to it
        "has_errors" : "true", // current screen has errors in its data
        "should_recompute" : "true" // current screen should recompute due to change in erlier step.
        "is_calculating" : "true" // current recomputation in progress. Dont leet user navigate to it until completed
    },
    contact_screen_enum : {
        "completion" : "UNCOMPLETE", "COMPLETE", "COMPLETE_WITH_ERROR",
        "computation" : "DONE", "SHOULD_RECOMPUTE", "IS_RECOMPUTING"
    }
}
*/

// this function should be called whenever a change occurs in a screen already visited. It will introspect masState object amd perform automatice update of data
// it will also be able to perform the update of elements in the proper order to avoid conflicts, and will keep calling itself until all steps are udpated
function updateState() {
    // loop over masState object and update each section with "should_recompute" : "true". call itself when complete and it will stop calling when all recompute are done
    // e.g. if (asset_screen.is_completed && should_recompute) { // recomputeAsset() and then updateState() }
}



// screens : contact, asset, deposit, file, review
// only reload partial data for current screen. Should be done in precise order to avoid conflicts
function recomputeContact() {} // probably unneeded because it is the first screen
function recomputeAsset() {} // probably unneeded because changing contact will have no effect on this
function recomputeDeposit() {} // triggered if buyer1 and asset (parkign, locker) changes
function recomputeFile() { // fetch all files for objects}
function recomputeReview() { // probably nothing to do since it is jsut loading objects in parent data
