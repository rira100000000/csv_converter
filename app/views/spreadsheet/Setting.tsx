import React from 'react';
import useModal from '../../frontend/src/hooks/useModal';

export default function Setting() {
  const { Modal, openModal, closeModal } = useModal();
  return (
    <>
      <button
        className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
        onClick={openModal}
      >
        設定
      </button>
      <Modal>
        <div className='bg-white border h-40 p-4 rounded-md print_none'>
        <div className="w-full max-w-xs">
  <h1 className="font-hairline mb-6 text-center">ユーザー情報変更</h1>

   {form_for(resource,
                 as: resource_name,
                 url: registration_path(resource_name),
                 html: {
                         method: :put,
                         class: "bg-white mb-4 px-8 pt-6 pb-8 rounded shadow-md"
                 }
        ) do |f|}

  <%#= render "devise/shared/error_messages", resource: resource %>
  <%= devise_error_messages! %>

  <div class="mb-4">
    <%= f.label :email, class: "block font-bold mb-2 text-gray-700 text-sm"  %><br />
    <%= f.email_field :email,
                              autofocus: true,
                              autocomplete: "email",
                              class: "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none shadow focus:shadow-outline" %>
  </div>

  <% if devise_mapping.confirmable? && resource.pending_reconfirmation? %>
  <div>Currently waiting confirmation for: <%= resource.unconfirmed_email %></div>
  <% end %>

  <div class="mb-4">
    <%= f.label :password, class: "block font-bold mb-2 text-gray-700 text-sm" %> <i>(leave blank if you don't want to change it)</i><br />
    <%= f.password_field :password, autocomplete: "new-password", class: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" %>

  </div>

  <div class="mb-4">
    <%= f.label :password_confirmation, class: "block font-bold mb-2 text-gray-700 text-sm"  %>
    <%= f.password_field :password_confirmation,
                                 autocomplete: "new-password",
                                 class: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            %>
  </div>

  <div class="mb-4">
    <%= f.label :current_password, class: "block font-bold mb-2 text-gray-700 text-sm" %>
    <%= f.password_field :current_password,
                                 autocomplete: "current-password",
                                 class: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                 
            %>
  </div>

  <div class="actions">
    <%= f.submit "Update", class: "button bg-blue-500 hover:bg-blue-700 font-bold text-white focus:outline-none py-2 px-4 rounded focus:shadow-outline w-full" %>
  </div>
  <% end %>

  <p>Unhappy? <span><%= button_to "Delete my account", registration_path(resource_name), data: { confirm: "Are you sure?" }, method: :delete %></span></p>

  <%= link_to "Back", :back %>
</div>




          <button
            className='inline-block text-sm px-4 py-2 leading-none border rounded text-amber-500 border-amber-500 hover:border-transparent hover:text-white hover:bg-amber-500 m-3'
            onClick={closeModal}
          >
            閉じる
          </button>
        </div>
      </Modal>
    </>
  );
}
