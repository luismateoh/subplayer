import React from "react"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions"
import { setStarOnSongs } from "../../redux/actions/favouritesActions"
import { makeGetSongsOfAlbum } from '../../redux/selectors/songSelectors'
// Utils
import subsonic from "../../api/subsonicApi"
// UI
import { Grid, Row, Col, Panel } from 'rsuite'
import SongsTable from '../songs/SongsTable'
import SongsTableEnhanced from '../songs/SongsTableEnhanced'

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable, SongsTable.columns.download]

export function Album(props) {
    const { album, songs, style } = props
    // Render all
    return (
        <Panel shaded bordered className="rs-table" style={{...style}}>
            <Grid fluid>
                <Row>
                    <Col smHidden xsHidden md={6} lg={6}>
                        <img src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : null} alt="Album Cover" width="100%" />
                    </Col>
                    <Col sm={24} md={18} style={{paddingLeft:"10px"}}>
                        <h2 id="albumHeader">
                            <img className="rs-hidden-md rs-hidden-lg" src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : null} alt="Album Cover" width="45" height="45" />
                            {album ? album.name : "..."}
                        </h2>
                        <SongsTableEnhanced songs={songs} columns={COLUMNS_TO_SHOW} fixedHeightToFill={false} withSearchFilter={false} />
                    </Col>
                </Row>
            </Grid>
        </Panel>
    )
}

Album.propTypes = {
    album : PropTypes.object,
    style : PropTypes.object,
    songs : PropTypes.array,
}

Album.defaultProps = {
    album : {},
    style : {},
    songs : [],
}

const mapStateToProps = (state, ownProps) => {
    const getSongsOfAlbum = makeGetSongsOfAlbum()
    return {
        "album" : state.albums.byId[ownProps.albumId],
        "songs" : getSongsOfAlbum(state, ownProps),
    }
}

const mapDispatchToProps = { addSongsToPlaylist, setStarOnSongs }

export default connect(mapStateToProps, mapDispatchToProps)(Album)