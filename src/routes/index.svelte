<script>
    import { Typio } from '$lib'
</script>

<h1>This is the typio text editor!</h1>

<h2>This is with the floating menu</h2>

<div class="wrapper">
    <Typio class="hello" preset="default" />
</div>

<h2>This is with the set menu</h2>

<div class="wrapper">
    <Typio class="hello" preset="full" />
</div>

<style>
    @import url('https://rsms.me/inter/inter.css');
    * {
        font-family: 'Inter', sans-serif;
        color: #333;
        text-align: center;
    }

    h1 {
        margin: 4rem;
        font-weight: 700;
        font-size: 2.4rem;
    }

    h2 {
        margin-top: 4rem;
        font-weight: 400;
        font-size: 1.6rem;
    }
</style>
