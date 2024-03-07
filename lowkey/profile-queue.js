// Express Controller Back-end


async function queueIndex(req, res) {
    try {
        const myProfile = await Profile.findOne({user: req.user._id})
        let excludeArr = myProfile.dislikes.map((id) => id)
        excludeArr.push(`${myProfile._id}`)
        excludeArr = excludeArr.concat(myProfile.likes)
        excludeArr = excludeArr.concat(myProfile.matches)
        const profileList = await Profile.find({_id: {$nin: excludeArr}}).limit(10)
        const profileListIdList = profileList.map((profile) => profile._id)
        const myPlaylist = await Playlist.findOne({profile: myProfile._id})
        const playlistArr = await Playlist.find({profile : {$in : profileListIdList}})
        let scoredPlaylistArr = []
        scoredPlaylistArr = calculationHelper.calculateQueue(playlistArr, myPlaylist)
        for (let i = 0; i < scoredPlaylistArr.length; i ++) {
            scoredPlaylistArr[i].profile =  await Profile.findOne({user: scoredPlaylistArr[i].playlist.user})
        }
        res.json(scoredPlaylistArr)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}