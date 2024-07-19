import styles from "./edit-text-element.module.css";

interface isEditingInterface {
  image: boolean;
  about: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
}

interface EditTextElementInterface {
  isEditing: isEditingInterface;
  option: "image" | "about" | "email" | "phone" | "password";
  spanText: string;
  handleEditClick: (option: string) => void;
}

export default function EditTextElement({
  isEditing,
  option, // used also as name and id for input field
  spanText,
  handleEditClick,
}: EditTextElementInterface) {
  return (
    <div className={styles.textContentWrapper}>
      <span className={styles.boldSpan}>
        {spanText}
        {!isEditing[option] && (
          <button type="button" onClick={() => handleEditClick(option)}>
            Edit
          </button>
        )}
      </span>
      {!isEditing[option] ? (
        <p>Dummy {spanText} Content</p>
      ) : (
        <input className={styles.input} id={option} name={option} />
      )}
    </div>
  );
}
