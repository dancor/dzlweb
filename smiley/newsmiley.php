<?php

  /*
   * newsmiley.php - Create a new feed story
   *
   */

include_once 'constants.php';
include_once LIB_PATH.'moods.php';
include_once LIB_PATH.'display.php';

echo render_header('New');

$moods = get_moods();

echo '<h2>' . 'What\'s your mood today?' . '</h2>';

$fb = get_fb();
$set_count = $fb->api_client->data_getUserPreference(2);
if ($set_count > 0) {
  echo "<h3>You've set your mood $set_count time"
       . ($set_count > 1 ? 's' : '')
       . " in the past.</h3>";
}

$feed_handler = ROOT_LOCATION . '/handlers/feedHandler.php';
echo '<form fbtype="feedStory" action="' . $feed_handler . '">';

echo render_emoticon_grid(get_moods());
echo '<input type="hidden" id="picked" name="picked" value="-1">'
         . '<div id="centerbutton" class="buttons">'
           . '<input type="submit" id="mood" label="My Mood">'
         . '</div>'
         . '<div id="emoticon"></div>'
  .'</form></div>';

echo render_footer();
