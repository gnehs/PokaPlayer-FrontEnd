export default {
  title: "English (US)",
  loading: "Loading...",
  header_welcome: "Welcome",
  checkUpdate_poka: "Update Available: {version}",
  checkUpdate_button: "Update",
  pingServer_title: "Hint",
  pingServer_content: "Server restarting success!",
  pingServer_reconnect: "Reconnect",
  copy: {
    success: "Copied to clipboard successfully!",
    failed: "Unable to write to clipboard."
  },
  home: "Home",
  nowplaying: "Player",
  library: "Library",
  lrc: "Lyrics",
  search: "Search",
  album: "Albums",
  folder: "Folders",
  artist: "Artists",
  song: "Songs",
  composer: "Composers",
  playlist: "Playlists",
  settings: "Settings",
  debug: "Debug",
  ok: "OK",
  cancel: "Cancel",
  reset: "Reset",
  back: "Back",
  login: "Login",
  login_page: {
    server: "Server",
    username: "Username",
    password: "Password",
    features: {
      opensource: {
        title: "Open Source",
        description: "All source code is on GitHub"
      },
      module: {
        title: "Modularization",
        description: "Easy to port any services"
      },
      streaming: {
        title: "Stream anywhere",
        description: "Listen to music anywhere"
      },
      fastinstall: {
        title: "Quick install",
        description: "Deploy using Docker in a snap"
      }
    },
    tips: {
      firstLogin: {
        title: "First time?",
        description:
          'The default user name and password are both "poka". You can change them in the settings'
      }
    },
    session: {
      _: "Reset session",
      description:
        "If you unable to log in, there may be an error in the session. ",
      description2:
        "You can enter the administrator account below to reset, but please note that this action will reset the login status of all users.",
      success: "Reset successfully, please try to log in",
      fail: "Reset failed, error reason:"
    }
  },
  nothingFound: "Nothing found",
  requestError: "An error occurred while requesting, please try again",
  home_recentAlbums: "Recent added albums",
  home_pins: "Pins",
  home_netease: "Netease",
  home_hqPlaylist_netease: "HQ Playlist",
  home_topPlaylist_netease: "Top Playlist",
  home_dailyRecommend_netease: "Daily Recommend",
  app_waitForPlay: "No queued songs. ",
  app_waitForPlay_description:
    "You can add more songs, or press below to shuffle.",
  now_cleanSongs: "Clear all songs?",
  now_cleanSongs_description: "This will remove every song in the playlist.",
  playlist_random: "Shuffle",
  playlist_page: {
    del: "DELETE",
    del_title: "Delete Playlist",
    delconfirm: 'Are you sure what to delete "{title}"?',
    edit_title: "Edit Playlist",
    title_input: "Playlist name",
    cover_input: "Playlist cover",
    edit_empty: "Field cannot be empty",
    playlist_empty:
      'You haven\'t created any playlists, click "+" in the upper right corner to add'
  },
  lrc_search: "Search lyrics",
  lrc_noKeyword: "Enter keyword to search",
  lrc_enter2search: "Press Enter key to start searching",
  lrc_notLoad: "Don't load lyrics",
  lrc_notLoad_description: "This will remove lyrics of the song now playing.",
  lrc_noLyrics: "No lyrics",
  lrc_saved: "lyric saved.",
  songAction_title: "Actions",
  songAction_name: "Name",
  songAction_artist: "Artists",
  songAction_album: "Album",
  songAction_source: "Source",
  songAction_like: "Like",
  songAction_like_success: 'Liked "{name}"',
  songAction_like_failed: 'An error occurred while liking "{name}".',
  songAction_unlike: "Unlike",
  songAction_unlike_success: 'Unliked "{name}"',
  songAction_unlike_failed: 'An error occurred while unliking "{name}".',
  songAction_rating: "Rate",
  songAction_rating0: "Clear rating",
  songAction_rating4song: "Successfully rated for {name}",
  songAction_rating_success: 'Rated {star} stars for "{name}".',
  songAction_rating_failed: "Rating {name} for {star} stars failed.",
  songAction_rating0_success: "Clear rating for {name} success!",
  songAction_rating0_failed: "Clear rating for {name} failed.",
  songAction_add2playlist: "Add to playlist",
  songAction_add2playlist_songNotExist: "{source}",
  songAction_add2playlist_songExist:
    "{source} / Song already added, click to delete",
  songAction_add2playlist_failed: "An error occured while processing {name}",
  songAction_add2playlist_add_success: "Added {name} to {playlist}",
  songAction_add2playlist_remove_success: "Removed {name} from {playlist}",
  album_total: "{songs} songs",
  albumsOfSameArtist: "Albums of the same artist",
  addSong_total: "{total} songs added",
  addSong_name: "Added {name}",
  moduleShowName_Netease: "Netease",
  moduleShowName_DSM: "DSM",
  sessionExpired: "Session expired, please log in again",
  add2nowPlaying: "Add this list to queue",
  pin: "釘選",
  pin_failed: "Failed to pin",
  unpin_failed: "Failed to unpin",
  settings_dark: "Night Mode",
  settings_network: "Network",
  settings_network_description: "Music quality",
  settings_network_soundQuality: "Music quality",
  settings_network_soundQuality_Low: "Low",
  settings_network_soundQuality_Med: "Medium",
  settings_network_soundQuality_High: "High",
  settings_network_soundQuality_Ori: "Original",
  settings_network_soundQuality_Low_description:
    "Only use when the internet is slow",
  settings_network_soundQuality_Med_description:
    "Able to stream smoothly under 3G network",
  settings_network_soundQuality_High_description:
    "Able to stream smoothly under 4G/LTE network",
  settings_network_soundQuality_Ori_description:
    "Uncompressed audio, only use when the internet is fast",
  settings_lang: "Language",
  settings_lang_description: "Set your PokaPlayer language",
  settings_systemAndUpdate: "System & update",
  settings_systemAndUpdate_description: "Update PokaPlayer, restart",
  settings_about: "About",
  settings_about_description: "Version, feedback",
  settings_about_contributions: "Contributions",
  settings_about_errorEeport: "Send feedback",
  settings_account: "Account",
  settings_logout: "Logout",
  settings_system: "System",
  settings_update: "Software update",
  settings_update_checking4updates: "Checking for updates...",
  settings_update_latestVersion: "Your PokaPlayer is up to date",
  settings_update_update2: "Update to {version}",
  settings_update_canUpdate2: "{version} is available",
  settings_update_go2UpdatePage: "Go to update page",
  settings_update_srvRestart: "Restart server.",
  settings_update_reconnect: "Reconnect",
  settings_update_initializing: "Initializing...",
  settings_update_updating: "Updating...",
  settings_update_git_fetch: "Initialize complete.",
  settings_update_git_reset: "Update download complete.",
  settings_update_git_api: "API update complete.",
  settings_updateDialog_note:
    "Notice: If Docker auto-restart is disabled, you must start PokaPlayer manually.",
  settings_updateDialog_note_dev:
    "If you update on developing machine, <mark>it may cause Git to crash</mark>",
  settings_updateDialog_view_previous: "View previous update log",
  settings_updateDialog_title: "{version} Release note",
  settings_restart: "Restart",
  settings_restarting: "Restarting",
  settings_restart_completed: "Restart completed.",
  settings_restartDialog_title: "Are you sure to restart?",
  settingIndex: {
    normalItems: "General",
    adminItems: "Server"
  },
  settingInterface: {
    _: "Interface",
    customize: {
      _: "Customizations",
      bg: {
        _: "Custom background",
        description: "Change background image",
        custom_link: "Custom link"
      },
      bg_cover: {
        _: "Background cover",
        description: "Change background cover size or hide it",
        options: {
          full: "Full cover",
          half: "Half cover",
          none: "Hide background"
        }
      },
      theme: "Theme",
      theme_color: {
        _: "Theme color",
        description: "Change the theme color"
      },
      lyric: {
        _: "Lyric theme",
        description: "Change the theme of lyric page"
      },
      layout: {
        _: "Layout",
        list: "list",
        card: "card",
        artist: "Artist page layout",
        composer: "Composer page layout"
      }
    },
    lang: "Language"
  },
  settingUser: {
    title: "User",
    description: "View your profile, change your password",
    name: "Name",
    username: "Username",
    role: "Role",
    password: "Password",
    passwordDescription: "Tap here to change your password",
    changeName: {
      title: "Change name",
      placeholder: "Enter a new name",
      result: {
        success: "Name successfully changed to {name}",
        error: "Name change failed"
      }
    },
    changeUsername: {
      title: "Change username",
      placeholder: "Enter a new username",
      result: {
        success:
          "Username successfully changed to {name}, please login with a new username next time",
        error: "Username change failed"
      }
    },
    changePassword: {
      title: "Change the password",
      oldPassword: "old password",
      newPassword: "new password",
      confirmPassword: "confirm password",
      confirmPasswordHelperText: "Enter your new password again",
      done: "change",
      result: {
        inconsistent: "Two passwords are inconsistent",
        same: "Password cannot be the same as the old password",
        success: "Password changed successfully",
        error: "Password change failed"
      }
    }
  },
  settingUserManagement: {
    title: "User management",
    role: {
      user: "user",
      admin: "admin"
    },
    dialog: {
      //create
      create: "Create User",
      createBtn: "Create",
      userCreated: "User created.",
      userCreateFailed: "User create failed.",
      userCreateUsernameRepeat: "Username is already taken.",
      //edit
      edit: "Edit User",
      //changePassword
      changePassword: "Change Password",
      changePasswordSuccess: "Password changed.",
      changePasswordFailed: "An error occurred when changing the password.",
      enterNewPassword: "Please enter the new password",
      //deleteUser
      deleteUser: "Delete this user",
      deleteUserFailed: "An error occurred when deleting the user"
    },
    field: {
      name: "Name",
      username: "Username",
      role: "Role",
      password: "Password"
    }
  },
  settingPravicy: {
    title: "Pravicy",
    description: "Data logging setting",
    notify: {
      title: "About data logging",
      body:
        "The data will only be calculated on your server and will not be uploaded to the Internet. The feature can provide you with a better experience (like: annual review, recent play).  You can turn off this feature below and clear the recorded data if you want."
    },
    dataRecord: {
      _: "Data logging",
      enabled: "Enabled",
      disabled: "Disabled",
      clear: "Clear the recorded data",
      logged: "{count} records have been recorded.",
      loading: "Loading...",
      confirm: "Are you sure you want to clear the data?",
      cleared: "Data cleared."
    }
  },
  settingPins: {
    title: "Pins management",
    deleteConfirm: "Are you sure want to unpin?"
  },
  adminLog: {
    title: "Log"
  },
  source: {
    DSM: "DSM",
    poka: "PokaPlayer",
    Netease2: "Netease",
    QQMusic: "QQ Music",
  },
  lyricEditor: {
    title: "Lyric Editor",
    instructionsTitle: 'Instructions',
    instructionsContent: 'Lyrics preview at the top, editing block at the bottom <br />After editing, please click the checkbox in the bottom left corner to save the lyrics, if you want to cancel the editing click the back button to leave <br />Click on the lyrics in the lyric preview to skip to that time, for bilingual lyrics, please click on the original part <br />If you have any questions or feature suggestions, please feel free to ask via "Settings->About->GitHub->Issues".',
    instructionsContentPhone: 'Lyrics preview at the top, editing block at the bottom<br />After editing, please click the checkbox in the bottom left corner to save the lyrics, if you want to cancel the editing click the back button to leave <br />Click on the lyrics in the lyric preview to skip to that time, for bilingual lyrics, please click on the original part <br />If you have any questions or feature suggestions, please feel free to ask via "Settings->About->GitHub->Issues".',
    timeShifting: 'Time Shifting',
    timeShiftingReset: 'Reset',
    textEditor: 'Text Editor'
  },
  review: {
    notify: {
      title: "Your year in review",
      description: "Review your most listened to songs, albums and other related statistics for the year",
      go: "Go"
    },
    page: {
      title: "Review",
      subtitle: "Your {year} year in review",
      mostPlayedSongs: "Most listened songs",
      mostPlayedAlbums: "Most listened to albums",
      mostPlayedArtists: "Most listened to artists",
      thankYouTitle: "Thank you for having you",
      thankYouDescription: "Thank you for using PokaPlayer, I hope to accompany you for more time in the future!",
    }
  }
};
