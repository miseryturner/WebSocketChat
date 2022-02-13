<template>
  <div class="wrapper">
    <div class="conversation-area">
      <div class="msg active">
        <img class="msg-profile" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg" alt="" />
        <div class="msg-detail">
          <div class="msg-username">Иван Иванов</div>
          <div class="msg-content">
            <span class="msg-message">Привет</span>
            <span class="msg-date">20м</span>
          </div>
        </div>
      </div>
      <div class="msg online">
        <img class="msg-profile" src="https://www.nicepng.com/png/detail/930-9302865_notes-from-reasons-to-conference-brighton-whatsapp-profile.png" alt="" />
        <div class="msg-detail">
          <div class="msg-username">Test Testing</div>
          <div class="msg-content">
            <span class="msg-message">test 123123</span>
            <span class="msg-date">45м</span>
          </div>
        </div>
      </div>
      <div class="msg">
        <img class="msg-profile" src="https://www.nicepng.com/png/detail/930-9302865_notes-from-reasons-to-conference-brighton-whatsapp-profile.png" alt="" />
        <div class="msg-detail">
          <div class="msg-username">Test Testing</div>
          <div class="msg-content">
            <span class="msg-message">test 123123</span>
            <span class="msg-date">45м</span>
          </div>
        </div>
      </div>
      <button class="add"></button>
      <div class="overlay"></div>
    </div>
    <div class="chat-area">
        <div class="chat-area-header">
          <div class="chat-area-title">Иван Иванов</div>
          <div class="chat-area-group">
            <img class="chat-area-profile" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg" alt="" />
          </div>
        </div>
        <div class="chat-area-main">
          <div class="chat-msg">
            <div class="chat-msg-profile">
              <img class="chat-msg-img" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg" alt="" />
              <div class="chat-msg-date">Сообщение отправлено 15мин назад</div>
            </div>
            <div class="chat-msg-content">
              <div class="chat-msg-text">
                test message, hello
              </div>
              <div class="chat-msg-text">
                <img src="https://www.travelanddestinations.com/wp-content/uploads/2020/12/Cappadocia-landscape-and-balloons.jpg" />
              </div>
              <div class="chat-msg-text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur odio numquam doloribus.
              </div>
            </div>
          </div>
          <div class="chat-msg owner">
            <div class="chat-msg-profile">
              <img class="chat-msg-img" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
              <div class="chat-msg-date">Сообщение отправлено 12мин назад</div>
            </div>
            <div class="chat-msg-content">
              <div class="chat-msg-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab magni, et nobis eveniet error consequuntur.😂😂😂</div>
              <div class="chat-msg-text">Lorem ipsum dolor sit amet consectetur.</div>
            </div>
          </div>
          <div class="chat-msg">
          <div class="chat-msg-profile">
            <img class="chat-msg-img" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-with-glasses.jpg" alt="">
            <div class="chat-msg-date">Сообщение отправлено 5мин назад</div>
          </div>
          <div class="chat-msg-content">
            <div class="chat-msg-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas est corrupti architecto eius, et temporibus dolor nesciunt debitis dolorem! Ea, ut, blanditiis sunt asperiores perspiciatis quos possimus laborum optio earum excepturi est ipsum eligendi rem, maiores autem officiis exercitationem placeat ipsam inventore tempora. Dolorem.</div>
          </div>
          </div>
        </div>
        <div class="chat-area-footer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
          <input type="text" placeholder="Сообщение..." />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up">
          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
        </div>
      </div>
      <div v-if="settingsView" class="detail-area">
        settings
      </div>
    </div>
</template>

<script>
    export default {
      props: [ 'settingsView' ],
    }
</script>
