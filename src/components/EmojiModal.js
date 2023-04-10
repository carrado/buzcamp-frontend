import EmojiPicker, {
    EmojiStyle,
    Theme,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
} from "emoji-picker-react";
import { useRef } from "react";


export default function EmojiModal({ openModal, emojiModel, themeState, left, margin, right, top }) {

    const emojiRef = useRef(null)

    const onClick = (emojiData) => {
        emojiModel(emojiData)
    }

    return (
        <>
            {openModal &&
                <div className="absolute" ref={emojiRef} style={{ right: `${right}%`, top: `${top}%`, left: `${left}%`, marginRight: `${margin}px` }}>
                    <EmojiPicker
                        onEmojiClick={onClick}
                        autoFocusSearch={false}
                        emojiStyle={EmojiStyle.FACEBOOK}
                        theme={themeState === 'dark' ? Theme.DARK : Theme.LIGHT}
                        skinTonePickerLocation={SkinTonePickerLocation.SEARCH}
                        suggestedEmojisMode={SuggestionMode.RECENT}
                    />
                </div>
            }
        </>
    )
}