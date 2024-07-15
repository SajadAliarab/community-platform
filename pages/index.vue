
<template>
    <UContainer>
        <UCard>
        <template #header>
            <div >
                <section id="user-area" class="text-center mb-16">
      <h2 class="text-3xl font-bold mb-4">User Area</h2>
      <p class="text-lg mb-8">The user area is fully operational. You can log in, edit your profile, update your picture, and change your password.</p>
      <img src="/public/images/user-area.png" alt="User Area" class=" w-24 mx-auto rounded-lg shadow-lg">
    </section>

    <section id="features" class="text-center mb-16">
      <h2 class="text-3xl font-bold mb-4">Upcoming Features</h2>
      <p class="text-lg mb-8">I am working hard to bring you more features. Stay tuned for updates and new functionalities that will enhance your experience.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-2 text-black">Community Forums</h3>
          <p class="text-gray-700">Engage with other users, share your experiences, and get advice from the community. write a topic and answer other user`s questions</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-2 textblack text-black">Knowledge Base</h3>
          <p class="text-gray-700"> Write Article about new product , and make an area for admin of community platform can control every things</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-2 text-black">Feed</h3>
          <p class="text-gray-700"> Dynamic feed section like other community platform that can engage more our community</p>
        </div>
      </div>
    </section>

  
    <section id="cta" class="bg-blue-600 text-white text-center py-16">
      <h2 class="text-3xl font-bold mb-4">Join Our Community Today!</h2>
      <p class="text-lg mb-8">Sign up now and be the first to know about new features and updates.</p>
      <a href="/signup" class="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">Sign Up</a>
    </section>
            </div>
        </template>
        </UCard>
    </UContainer>
</template>