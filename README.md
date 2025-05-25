# UserName-Manipulation

## Project Summary

This project allows manipulation of usernames with registration-based control, local storage support, and various interactive features.

### Features:

- **Empty Input Warning**: Displays a warning with a border and a timeout when trying to submit an empty input.
- **Input Reset**: After a successful addition, `input.value` is reset to an empty string.
- **Edit Restrictions**: Editing is not allowed unless the user is registered.
- **Notices with Timeout**: Notifications are shown using `setTimeout`.
- **UI Reset on Sign Out**:
  - Buttons and input fields are removed.
  - A new `<div>` with a recovery class is appended to restore the removed areas.
- **Local Storage Sync**:
  - Items are saved to local storage.
  - Both the main and blocked arrays are updated accordingly.
- **Sign Out Handling**:
  - Clicking the `regOut` button sets the `reg` Boolean to `false`.
  - The necessary classes are added back to `.temp`.
  - The notification element is removed.
- **Sorting**: Includes a sort function that can reverse-sort both arrays alphabetically.
- **Search Feature**:
  - Moves matching elements to the top of the array.
  - Alters array positions based on the selected search result.
- **Typing Animation**:
  - A character is added to `innerHTML` at regular intervals.
  - Animation starts from index -1 and ends at the full length of the string.
  - Styling is applied during the animation timeout.
- **Array Update Function**:
  - Updates arrays from anywhere in the app.
  - Meets specific conditions to update elements.
- **Blocked Array Handling**:
  - Blocked array updates must be followed by a refresh to reflect changes immediately.
- **Remove Functionality**:
  - A `remove()` function is defined within the update function.
  - Displays each element with a "close" button.
  - Removes the selected item from the array using `splice()`.
  - Shows an animation with a timeout during the removal process.
- **Unblock Function**: Allows unblocking items directly from the blocked array.
- **Conditional Search**:
  - Main search functionality varies based on whether the user is registered.
  - Also includes local storage integration for saving blocked items.
