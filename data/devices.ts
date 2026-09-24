import type { Device } from '@/lib/types';
type DeviceDefinition = {
  slug: string;
  name: string;
  shortName: string;
  type: Device['type'];
  description: string;
  requirements: string[];
  install: string;
  login: string;
  playback: string;
  troubleshooting: string;
  tip: string;
};
const definitions: DeviceDefinition[] = [
  {
    slug: 'firestick',
    name: 'Amazon Fire TV & Fire Stick',
    shortName: 'Fire TV / Stick',
    type: 'tv',
    description:
      'Bring IPTV to an HDMI television with a compatible Fire TV player and a remote-friendly setup.',
    requirements: [
      'Your Fire TV model and software version',
      'An Amazon account for the device app store',
      'A supported TV player and account credentials',
      'Stable Wi-Fi or a compatible Ethernet adapter',
    ],
    install:
      'From your Fire TV home screen, use search to find the player recommended for your device. Check the developer and supported model before selecting the store installation option. App listings vary by device and region. If the player is missing, ask support for a supported store alternative instead of downloading a random APK. Some newer Fire TV hardware uses different software, so a familiar app name does not guarantee compatibility.',
    login:
      'Open the installed player and select the login method that matches your account. A server address, username, and password belong in separate fields when the app uses an account-style login. A complete playlist URL belongs in the playlist field. Use a recognizable profile label such as Living Room, and check punctuation before loading channels.',
    playback:
      'Test navigation with the directional pad before making the player your regular TV interface. Add a few available channels to favorites, check the Back button, and confirm that audio and subtitles behave as expected. Power the stick through its recommended adapter; an underpowered television USB port can cause instability. Keep the device ventilated behind the screen.',
    troubleshooting:
      'If the app closes, restart Fire TV and check available storage. Clear the affected app cache only after recording the profile details; clearing data can erase the account setup. If video pauses, compare a lower-quality stream, move the router, or test Ethernet with a supported adapter. A single failing channel while others play calls for a channel report, not repeated factory resets.',
    tip: 'Use the Fire TV remote app only through an official store if entering a long address with the remote is difficult. Never photograph or share a QR code that contains your account password.',
  },
  {
    slug: 'android-tv',
    name: 'Android TV & Google TV',
    shortName: 'Android / Google TV',
    type: 'tv',
    description:
      'Use a TV-optimized player on Android TV or Google TV, including supported televisions and streaming boxes.',
    requirements: [
      'A supported Android TV or Google TV device',
      'Access to its official app store',
      'A player designed for remote navigation',
      'The login format supplied with your account',
    ],
    install:
      'Open the Apps area or device search and look for a TV-compatible player in the official store. Verify the publisher and confirm remote-control support. A phone version of an Android app may not be suitable for a television even when the names match. Google TV interface labels can vary by manufacturer and software release.',
    login:
      'Choose the playlist or account-login option supplied by support. Enter the server address exactly, including the protocol and any required port. Allow the initial channel and guide import to finish before reopening the app. A large guide can take longer than the initial login screen suggests.',
    playback:
      'Create a favorites list so you can reach regular channels without scrolling an entire catalog. Check the television display mode and player aspect ratio before assuming a stream is cropped. Where supported, Ethernet removes a variable when diagnosing living-room Wi-Fi. Change one playback setting at a time and record the original option.',
    troubleshooting:
      'If the store says the player is incompatible, confirm the operating system and model rather than trying phone APKs. For a black picture with working sound, test a different stream and the player’s documented decoder options. For repeated stops, temporarily close other media apps and compare the same content on the same network at another time.',
    tip: 'Google TV is an interface used on compatible devices; a screen branded as a smart TV does not automatically run Google TV.',
  },
  {
    slug: 'smart-tv',
    name: 'Samsung, LG & Other Smart TVs',
    shortName: 'Smart TVs',
    type: 'tv',
    description:
      'Check your television’s operating system and app store before choosing a player or subscription.',
    requirements: [
      'Exact TV brand, model number, and model year',
      'The region configured in the TV app store',
      'A player available for that operating system',
      'Your account details and any separate player activation terms',
    ],
    install:
      'Find the model number in the TV settings or on its label. Samsung and LG use different app platforms from Android TV, and availability can change with model year. Search the television’s own app store for the recommended player. Review any player trial, device activation, or paid license separately from the KroozIPTV subscription.',
    login:
      'Some TV players accept account details directly; others ask you to manage a playlist through the developer’s official website using a device identifier. Confirm that workflow with the app publisher. Treat a device identifier as private account information when it is linked to your subscription. Do not submit login details to unofficial playlist-upload websites.',
    playback:
      'Start with a small selection of confirmed channels, then check guide timing, remote navigation, subtitles, and audio output. A wired network connection can be easier to evaluate than Wi-Fi behind a wall-mounted TV. TV processors and memory differ greatly between models, so inspect actual playback rather than relying only on the panel’s 4K label.',
    troubleshooting:
      'If the store does not offer a compatible app, a supported external streaming device may be more practical than replacing the television. Do not change the TV country setting simply to evade availability restrictions. If the app loads slowly, check firmware and available storage, then ask the publisher about supported playlist sizes.',
    tip: 'A TV with an excellent picture can still have an older app platform. App support and screen resolution are separate questions.',
  },
  {
    slug: 'apple-tv',
    name: 'Apple TV',
    shortName: 'Apple TV',
    type: 'tv',
    description:
      'Set up a compatible tvOS player with a television-friendly interface and your confirmed account details.',
    requirements: [
      'An Apple TV model with App Store support',
      'An Apple Account for app downloads',
      'A compatible tvOS player',
      'A stable connection and supported login method',
    ],
    install:
      'On Apple TV models with an App Store, search for a compatible player and read its tvOS requirements. Apple TV 4K and Apple TV HD support App Store downloads; older Apple TV hardware has different limitations. Confirm whether a player is a one-time purchase or subscription before downloading it.',
    login:
      'Use the player’s documented account or playlist workflow. If it supports pairing from a phone, make sure the phone and Apple TV belong to your own trusted setup. Confirm the server address and credentials before saving. A player’s App Store subscription does not activate a KroozIPTV account.',
    playback:
      'Check the behavior of the Siri Remote, favorites, and guide browsing. Test both video and audio with your TV or receiver. Display settings and content frame rates can affect perceived smoothness independently of bandwidth. If your model includes Ethernet, use a wired comparison when Wi-Fi is inconsistent.',
    troubleshooting:
      'If you cannot find the app, verify the Apple TV model, software version, and regional store listing. If authentication succeeds but playback fails, note whether the issue affects every channel or only one stream. Restart the app before changing display or audio settings globally.',
    tip: 'AirPlay and a native tvOS player are different viewing methods. Do not assume casting is supported simply because an iPhone app can play the stream.',
  },
  {
    slug: 'iphone-ipad',
    name: 'iPhone & iPad',
    shortName: 'iPhone / iPad',
    type: 'phone',
    description:
      'Prepare a mobile player for personal viewing and keep an eye on network changes and data use.',
    requirements: [
      'A supported iOS or iPadOS version',
      'An app from the official App Store',
      'Compatible account or playlist details',
      'Permission to use the account on this device',
    ],
    install:
      'Search the App Store for the player recommended for your iPhone or iPad. Verify its publisher, supported login methods, and any paid features. Screen size and split-view support can differ between phone and tablet editions. Avoid installing profiles or device-management tools just to watch television.',
    login:
      'Paste credentials carefully and check for spaces introduced by copying a message. Keep server URLs out of shared notes if they contain a username or password. Where the player offers a device lock or parental PIN, configure it separately from your subscription credentials.',
    playback:
      'Begin on home Wi-Fi and test full-screen playback, rotation, audio, and captions. Switching between Wi-Fi and cellular can interrupt a live session and may affect account access conditions. Confirm any travel or network-use restrictions with support. High-quality video can use significant cellular data; check your mobile plan and player settings.',
    troubleshooting:
      'If playback stops when the screen locks, check the player’s documented background behavior rather than assuming the account failed. If audio is missing, inspect mute settings, Bluetooth routing, and another stream. For a login problem, verify credentials privately before reinstalling the app.',
    tip: 'Screen mirroring, casting, and external-display support depend on the player and content. Test those features before relying on them for a television setup.',
  },
  {
    slug: 'windows',
    name: 'Windows PC',
    shortName: 'Windows',
    type: 'computer',
    description:
      'Watch through a supported desktop player while keeping account details and network settings under control.',
    requirements: [
      'A supported Windows version',
      'A legitimate compatible desktop player',
      'The account login format or playlist URL',
      'Working display and audio devices',
    ],
    install:
      'Download the recommended player from its official publisher or a verified store listing. Check system requirements and avoid installers packaged with unrelated utilities. A desktop player that opens local videos is not necessarily a complete IPTV interface with guide support.',
    login:
      'Use the player’s account, playlist, or network-stream option as appropriate. A full playlist URL may embed credentials, so avoid pasting it into public browser search boxes or screenshots. Save the profile with a neutral label rather than including the password in its name.',
    playback:
      'Confirm the selected speaker or headset, display scaling, and full-screen controls. If using an external monitor, test playback there before changing the Windows display arrangement. Connect to Ethernet for a baseline test and pause cloud backups or large downloads while comparing results.',
    troubleshooting:
      'A firewall prompt should be evaluated for the specific trusted player; disabling the entire firewall is not a useful first step. If the app crashes, update it from the original source and record the error. For a black screen, compare another stream and the documented hardware-decoding option, changing only one setting at a time.',
    tip: 'Keep account links out of shared clipboard history and screen recordings. A playlist address can function like a password.',
  },
  {
    slug: 'macos',
    name: 'macOS',
    shortName: 'Mac',
    type: 'computer',
    description:
      'Use a compatible Mac player and a clean account profile for desktop or external-monitor viewing.',
    requirements: [
      'A supported macOS version',
      'A player from a verified publisher or Mac App Store',
      'Account credentials or a playlist URL',
      'The correct sound output and display connection',
    ],
    install:
      'Choose a player that explicitly supports your macOS release and Mac hardware. Install it from the Mac App Store or the publisher’s official distribution channel. Check whether a mobile App Store purchase also covers the Mac edition; do not assume shared licensing.',
    login:
      'Add the playlist or account using the player’s documented workflow. Copy the server address accurately and preserve the complete URL when a playlist is supplied. Use a private password manager or protected note for account details rather than a shared document.',
    playback:
      'Check the selected macOS sound output if headphones, a display, or a receiver is connected. Test the intended external display and any subtitle options. Laptop power settings can stop playback when the computer sleeps, so distinguish a sleeping Mac from a failing stream.',
    troubleshooting:
      'For an app that will not open, check operating-system requirements and publisher guidance. Do not disable system security to force an unknown download to run. For stuttering, close heavy applications, compare Ethernet if available, and test a lower-quality feed before changing the whole network.',
    tip: 'AirPlay support depends on the player and the receiving device. A successful local playback test does not guarantee that wireless display output will work.',
  },
  {
    slug: 'iptv-smarters',
    name: 'IPTV Smarters',
    shortName: 'IPTV Smarters',
    type: 'player',
    description:
      'Understand account and playlist login methods before setting up a legitimate Smarters player edition.',
    requirements: [
      'A verified player listing for your platform',
      'A compatible account login method',
      'Server address and account credentials when required',
      'Confirmation of any separate player fees',
    ],
    install:
      'Start with the exact app and publisher recommended for your platform. Similar names and icons can identify different products, and availability varies between operating systems. Use a verified app store or official publisher source. Do not assume a random download page is an official edition.',
    login:
      'Where an account-style login is supported, enter a profile name, username, password, and server address in their respective fields. A profile name is simply your own label; it is not an additional credential. Where a playlist option is supplied, paste the entire URL in the playlist field instead.',
    playback:
      'Let the initial content import finish, then test a channel, favorites, and available guide data. Keep the app edition and version handy if you contact support. The player organizes content supplied by an account; installing the player alone does not provide television service.',
    troubleshooting:
      'An invalid-login message can come from a typo, an unsupported endpoint, an inactive account, or a connection limit. Record the exact wording without exposing the password. If categories load but a stream fails, distinguish account import from video playback and report which stage failed.',
    tip: 'A player activation, a premium player feature, and an IPTV subscription are separate purchases unless explicitly bundled by the seller.',
  },
  {
    slug: 'tivimate',
    name: 'TiviMate',
    shortName: 'TiviMate',
    type: 'player',
    description:
      'Prepare a supported Android TV player profile, organize favorites, and check guide settings.',
    requirements: [
      'A compatible Android TV device',
      'The legitimate player edition for your device',
      'A supported playlist or account format',
      'Separate confirmation of any premium player features',
    ],
    install:
      'Confirm that your device and operating system are supported by the legitimate TiviMate publisher. Follow its official installation route and review which features require a separate license. A mobile phone, Apple TV, or non-Android smart TV should not be assumed compatible.',
    login:
      'Choose the playlist type matching the details supplied by your provider. Enter the account fields or playlist address, name the profile clearly, and allow channel parsing to finish. Add an EPG source only when support has supplied one or confirmed the appropriate account-generated guide.',
    playback:
      'Build a manageable favorites group before reorganizing the whole channel list. Check local time and guide alignment using a current known program. Keep a note of customized guide offsets, because an offset intended for one source can make another source appear wrong.',
    troubleshooting:
      'If a playlist loads but guide rows remain blank, compare the EPG refresh time, account validity, and channel matching. If streams fail while guide data remains visible, investigate playback and account connections separately. Do not repeatedly delete the playlist before recording custom settings.',
    tip: 'Premium player features and provider capabilities are independent. A recording menu does not guarantee recording permissions or enough simultaneous connections.',
  },
  {
    slug: 'android-mobile',
    name: 'Android Phones & Tablets',
    shortName: 'Android mobile',
    type: 'phone',
    description:
      'Use a touch-friendly Android player and test mobile viewing without assuming TV-app compatibility.',
    requirements: [
      'A supported Android phone or tablet',
      'An official store player listing',
      'Compatible account details',
      'A suitable Wi-Fi or mobile-data allowance',
    ],
    install:
      'Select a player designed for touch screens from a verified store listing. Android TV apps may expect remote buttons and display poorly on a phone. Review required permissions and avoid apps requesting access unrelated to playback.',
    login:
      'Add the supplied account or playlist without sharing its URL publicly. If Android suggests autofill, verify that it has placed the correct credential in each field. Give the profile a neutral name so screenshots of the home screen do not reveal account details.',
    playback:
      'Test screen rotation, Bluetooth audio, and captions on home Wi-Fi. Watch mobile-data consumption when moving away from Wi-Fi. A network switch can interrupt a session; check account-use conditions before relying on viewing away from home.',
    troubleshooting:
      'If the app stops in the background, review documented battery-management behavior for your device. If playback works on Wi-Fi but not mobile data, check app data permissions and the account’s network conditions. Do not repeatedly change unrelated network settings.',
    tip: 'Casting support is a separate feature. Test it explicitly with your receiving television before assuming it is part of the mobile app.',
  },
  {
    slug: 'nvidia-shield',
    name: 'NVIDIA Shield',
    shortName: 'NVIDIA Shield',
    type: 'tv',
    description:
      'Use a compatible Android TV player on Shield and check the full TV-and-receiver playback path.',
    requirements: [
      'A supported Shield model and software release',
      'A TV-compatible player from a verified store',
      'Account credentials',
      'A stable network connection',
    ],
    install:
      'Use Shield’s official app store to find a compatible Android TV player. Check the current app requirements, update the device software when appropriate, and keep enough storage available for guide data and app updates.',
    login:
      'Enter the supplied account details or playlist and wait for the first import to complete. Name the profile clearly and test a few confirmed streams before importing extra sources or customizing a large guide.',
    playback:
      'Shield may connect through a receiver or soundbar before reaching the television. Test audio and picture on that complete path. Use Ethernet where available to establish a network baseline, and avoid changing AI upscaling or display settings at the same time as network troubleshooting.',
    troubleshooting:
      'When sound is absent, compare another stream and check the receiver input and supported audio formats. When video pauses, inspect network stability and connection allowances before assuming a hardware limitation. Keep player settings at a known baseline for support.',
    tip: 'A capable streaming box cannot add content rights, channels, or simultaneous connections beyond the account’s confirmed package.',
  },
  {
    slug: 'mag',
    name: 'MAG-Compatible Devices',
    shortName: 'MAG devices',
    type: 'tv',
    description:
      'Confirm portal compatibility with support before making any changes to a dedicated IPTV box.',
    requirements: [
      'Exact device model and firmware details',
      'Explicit confirmation of portal compatibility',
      'A portal address supplied privately by support',
      'Authorized registration details where required',
    ],
    install:
      'Dedicated portal-based boxes use a different setup path from app-store players. Confirm the exact model and supported portal format with support first. Do not assume every MAG-branded or compatible box uses the same firmware or settings.',
    login:
      'Only enter the portal address supplied for your authorized account. Some setups require a device identifier to be registered by support; send it privately and only when requested. Do not clone identifiers from another device or use someone else’s portal credentials.',
    playback:
      'After support confirms registration, follow the device manufacturer’s portal-loading instructions. Test navigation, a confirmed channel, and the program guide. Keep the previous configuration recorded privately if you are migrating from an existing authorized service.',
    troubleshooting:
      'A portal-loading failure may be a network issue, an unregistered device, an incompatible model, or a mistyped URL. Report the screen message and model rather than cycling through public portal lists. Avoid firmware changes without manufacturer guidance.',
    tip: 'Portal compatibility must be confirmed before ordering. A playlist login and a portal registration are not interchangeable.',
  },
];
export const devices: Device[] = definitions.map((d) => ({
  ...d,
  sections: [
    {
      id: 'before-you-start',
      title: `Before you set up ${d.shortName}`,
      paragraphs: [
        d.description,
        'Confirm the intended device, player, login format, and simultaneous connection allowance with KroozIPTV before paying. Keep the device connected to a stable home network for your first test so you can separate account setup from network changes. A trial, when available, is a useful time to verify the actual hardware you plan to use.',
      ],
      bullets: d.requirements,
    },
    {
      id: 'install-player',
      title: 'Choose and install a compatible player',
      paragraphs: [
        d.install,
        'Read the publisher’s current requirements and pricing before installing. App-store availability and menus can change, so use the manufacturer’s own help if the screen differs from this overview. Never enter payment details into an unfamiliar installer or share account credentials with an unrelated app-support service.',
      ],
    },
    {
      id: 'add-account',
      title: 'Add your account carefully',
      paragraphs: [
        d.login,
        'Keep the account details private. A playlist can include the same access information as a password, even if it looks like a normal web address. If the login fails, check the original message for accidental spaces, letter case, missing protocol, or an omitted port. Ask support to confirm the account is active rather than repeatedly guessing values.',
      ],
    },
    {
      id: 'test-playback',
      title: 'Check the experience before settling in',
      paragraphs: [
        d.playback,
        'Make your test realistic: use the same room, screen, and viewing time you expect to use regularly. Verify a few types of available programming, inspect picture and sound, and browse the guide. A single successful channel is useful evidence, but it does not establish that every requested channel or feature is included.',
      ],
    },
    {
      id: 'troubleshooting',
      title: `Troubleshooting ${d.shortName}`,
      paragraphs: [
        d.troubleshooting,
        'Write down the exact error, the time it happened, and whether it affects one stream or every stream. Include the app version and device model when contacting support. Do not send screenshots that show a password, complete playlist URL, or private account identifier in a public conversation.',
      ],
    },
    {
      id: 'useful-detail',
      title: 'One detail worth checking',
      paragraphs: [
        d.tip,
        'Before extending a subscription, recheck the package and device arrangement you actually need. Installing the app on another screen is not permission to use two simultaneous streams. Confirm that allowance explicitly, and close the first player while testing the second if the account permits only one connection.',
      ],
    },
  ],
  faqs: [
    {
      question: `Is ${d.shortName} guaranteed to work?`,
      answer:
        'Compatibility depends on the exact model, software version, player, and supplied account format. Confirm those details with support and test the intended setup before committing.',
    },
    {
      question: 'Does the subscription include the player license?',
      answer:
        'Third-party app charges are separate unless support explicitly confirms they are included. Check the publisher’s pricing and trial terms.',
    },
    {
      question: 'What should I do if these menu names are different?',
      answer:
        'Use the current help from your device manufacturer and player publisher. Share your model and app version with support so the guidance matches your actual screen.',
    },
  ],
}));
