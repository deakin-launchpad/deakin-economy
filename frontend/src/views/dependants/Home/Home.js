import React from 'react'
import $ from 'jquery'

export const Home = () => {

  
  $(document).ready(function(){

    $('.counter').each(function() {
      var $this = $(this),
          countTo = $this.attr('data-count');
    
      $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
    
      {
    
        duration: 3000,
        easing:'linear',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
          //alert('finished');
        }
      });
    });
    });
    
  return (
    <div className="home">
      <h1>Money</h1>
      <span class="counter center" data-count="1000000">0</span>
      <h1>Users</h1>
      <span class="counter" data-count="400">0</span>
      <h1>Transactions</h1>
      <span class="counter" data-count="95">0</span>
    </div>
  )
}
